import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { isRazorpayConfigured, getRazorpayKeyId, getRazorpayKeySecret } from '@/lib/razorpay';
import { products } from '@/data/products';
import { VALID_PROMO_CODES } from '@/lib/utils';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

const TAX_RATE = 0.05;
const FREE_SHIPPING_THRESHOLD = 50;
const STANDARD_SHIPPING = 5;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      amount,
      currency = 'USD',
      receipt,
      notes,
      items,
      discountCode,
      shippingAddress,
    } = body;

    // ── Validate currency & items ──────────────────────────
    if (currency.toUpperCase() !== 'USD' || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'A USD order with at least one item is required' },
        { status: 400 }
      );
    }

    // ── Validate each item against product catalogue ───────
    const catalog = new Map(products.map((p) => [p.id, p]));
    const normalizedItems = items.map((item: { id?: unknown; qty?: unknown; selectedSize?: unknown }) => ({
      product: catalog.get(String(item.id)),
      quantity: Number(item.qty),
      selectedSize: item.selectedSize as string | undefined,
    }));

    if (
      normalizedItems.some(
        ({ product, quantity }) =>
          !product || !Number.isInteger(quantity) || quantity < 1 || quantity > 10000
      )
    ) {
      return NextResponse.json(
        { error: 'One or more cart items are invalid' },
        { status: 400 }
      );
    }

    // ── Server-side price computation ──────────────────────
    const subtotal = normalizedItems.reduce(
      (sum, { product, quantity }) => sum + product!.price * quantity,
      0
    );
    const promo =
      typeof discountCode === 'string'
        ? VALID_PROMO_CODES[discountCode.trim().toUpperCase()]
        : undefined;
    const discount = (subtotal * (promo?.percent || 0)) / 100;
    const tax = (subtotal - discount) * TAX_RATE;
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
    const expectedAmount = Number((subtotal - discount + tax + shipping).toFixed(2));
    const requestedAmount = Number(amount);

    if (
      !Number.isFinite(requestedAmount) ||
      requestedAmount <= 0 ||
      requestedAmount !== expectedAmount
    ) {
      return NextResponse.json(
        { error: 'Order total is invalid. Please refresh your cart and try again.' },
        { status: 400 }
      );
    }

    // ── Check Razorpay config ──────────────────────────────
    if (!isRazorpayConfigured()) {
      return NextResponse.json(
        {
          error:
            'Payment gateway configuration is missing or inactive. Please contact store support.',
        },
        { status: 503 }
      );
    }

    const keyId = getRazorpayKeyId();
    const keySecret = getRazorpayKeySecret();

    // ── Create Razorpay order ──────────────────────────────
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const receiptId = receipt || `lari_${Date.now().toString().slice(-8)}`;

    const rzpOrder = await razorpay.orders.create({
      amount: Math.round(expectedAmount * 100), // smallest sub-unit (cents for USD)
      currency: currency.toUpperCase(),
      receipt: receiptId,
      notes: {
        company: 'Lari Industries Kanpur',
        itemsCount: items.length.toString(),
        currency: 'USD',
        customerEmail: shippingAddress?.email || '',
        customerName: shippingAddress?.fullName || '',
        ...notes,
      },
    });

    // ── Persist PENDING order to MongoDB ───────────────────
    try {
      await connectDB();

      const receiptNumber = `LARI-INV-${new Date().getFullYear()}-${Math.floor(
        100000 + Math.random() * 900000
      )}`;

      await Order.create({
        receiptNumber,
        razorpayOrderId: rzpOrder.id,
        razorpayPaymentId: '',
        razorpaySignature: '',
        items: normalizedItems.map(({ product, quantity, selectedSize }) => ({
          productId: product!.id,
          name: product!.name,
          price: product!.price,
          quantity,
          image: product!.image,
          selectedSize,
        })),
        subtotal: Number(subtotal.toFixed(2)),
        discountCode: promo ? discountCode?.trim().toUpperCase() : undefined,
        discountAmount: Number(discount.toFixed(2)),
        tax: Number(tax.toFixed(2)),
        shipping: Number(shipping.toFixed(2)),
        total: expectedAmount,
        currency: 'USD',
        shippingAddress: shippingAddress || {},
        status: 'PENDING',
        paymentMethod: 'RAZORPAY',
        webhookVerified: false,
      });
    } catch (dbErr) {
      // Non-fatal: log but don't block payment
      console.error('[MongoDB] Failed to persist PENDING order:', dbErr);
    }

    return NextResponse.json({
      id: rzpOrder.id,
      amount: rzpOrder.amount,
      currency: rzpOrder.currency,
      receipt: rzpOrder.receipt,
      status: rzpOrder.status,
      keyId,
    });
  } catch (error: any) {
    console.error('Error in Razorpay create-order:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to initialize Razorpay order' },
      { status: 500 }
    );
  }
}
