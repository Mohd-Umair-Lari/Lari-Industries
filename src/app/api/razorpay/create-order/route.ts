import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { isRazorpayConfigured, getRazorpayKeyId, getRazorpayKeySecret } from '@/lib/razorpay';
import { products } from '@/data/products';
import { VALID_PROMO_CODES } from '@/lib/utils';

const TAX_RATE = 0.05;
const FREE_SHIPPING_THRESHOLD = 50;
const STANDARD_SHIPPING = 5;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency = 'USD', receipt, notes, items, discountCode } = body;

    if (currency.toUpperCase() !== 'USD' || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'A USD order with at least one item is required' }, { status: 400 });
    }

    const catalog = new Map(products.map((product) => [product.id, product]));
    const normalizedItems = items.map((item: { id?: unknown; qty?: unknown }) => ({
      product: catalog.get(String(item.id)),
      quantity: Number(item.qty),
    }));
    if (normalizedItems.some(({ product, quantity }) => !product || !Number.isInteger(quantity) || quantity < 1 || quantity > 10000)) {
      return NextResponse.json({ error: 'One or more cart items are invalid' }, { status: 400 });
    }

    const subtotal = normalizedItems.reduce((sum, { product, quantity }) => sum + product!.price * quantity, 0);
    const promo = typeof discountCode === 'string' ? VALID_PROMO_CODES[discountCode.trim().toUpperCase()] : undefined;
    const discount = subtotal * (promo?.percent || 0) / 100;
    const tax = (subtotal - discount) * TAX_RATE;
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
    const expectedAmount = Number((subtotal - discount + tax + shipping).toFixed(2));
    const requestedAmount = Number(amount);

    if (!Number.isFinite(requestedAmount) || requestedAmount <= 0 || requestedAmount !== expectedAmount) {
      return NextResponse.json(
        { error: 'Order total is invalid. Please refresh your cart and try again.' },
        { status: 400 }
      );
    }

    // In Razorpay, amount is passed in the smallest currency sub-unit:
    // For USD: Cents (1 USD = 100 cents)
    const amountInSubunits = Math.round(expectedAmount * 100);

    const configured = isRazorpayConfigured();

    if (!configured) {
      return NextResponse.json(
        { error: 'Payment gateway configuration is missing or inactive. Please contact store support.' },
        { status: 503 }
      );
    }

    const keyId = getRazorpayKeyId();
    const keySecret = getRazorpayKeySecret();

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: amountInSubunits,
      currency: currency.toUpperCase(),
      receipt: receipt || `lari_${Date.now().toString().slice(-8)}`,
      notes: {
        company: 'Lari Industries Kanpur',
        itemsCount: items.length.toString(),
        currency: 'USD',
        ...notes,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
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
