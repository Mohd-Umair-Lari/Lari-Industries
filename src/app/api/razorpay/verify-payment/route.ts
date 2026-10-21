import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpaySignature, isRazorpayConfigured } from '@/lib/razorpay';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { sendOrderConfirmationEmails } from '@/lib/email';

function generateReceiptNumber(): string {
  const year = new Date().getFullYear();
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `LARI-INV-${year}-${ts}${rand}`;
}

function normalizeShippingAddress(addr: any) {
  if (!addr) {
    return { fullName: 'Unknown', email: '', addressLine1: 'Unknown', city: 'Unknown', country: 'Unknown' };
  }
  return {
    fullName: addr.fullName || 'Unknown',
    email: addr.email || '',
    phone: addr.phone || '',
    companyName: addr.companyName,
    gstNumber: addr.gstNumber,
    addressLine1: addr.addressLine1 || 'Unknown',
    addressLine2: addr.addressLine2,
    city: addr.city || 'Unknown',
    state: addr.state || '',
    pincode: addr.pincode || '',
    country: addr.country || 'United States',
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = body;

    if (!isRazorpayConfigured()) {
      return NextResponse.json(
        { error: 'Payment gateway configuration is missing or inactive.' },
        { status: 503 }
      );
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing mandatory payment verification fields' },
        { status: 400 }
      );
    }

    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cryptographic signature mismatch. Payment verification failed.',
        },
        { status: 400 }
      );
    }

    let receiptNumber = generateReceiptNumber();
    let orderDoc: any = null;

    try {
      await connectDB();

      const existingOrder = await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          $set: {
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
            status: 'PAID',
          },
        },
        { new: true }
      );

      if (existingOrder) {
        receiptNumber = existingOrder.receiptNumber;
        orderDoc = existingOrder;

        if (
          orderData?.shippingAddress &&
          (!existingOrder.shippingAddress?.fullName ||
            existingOrder.shippingAddress.fullName === 'Unknown')
        ) {
          await Order.updateOne(
            { razorpayOrderId: razorpay_order_id },
            { $set: { shippingAddress: normalizeShippingAddress(orderData.shippingAddress) } }
          );
          // Refresh the order doc with updated shipping address
          orderDoc = await Order.findOne({ razorpayOrderId: razorpay_order_id });
        }

        console.log(`[MongoDB] Order ${receiptNumber} marked as PAID`);
      } else {
        if (orderData) {
          const fallbackOrder = await Order.create({
            receiptNumber,
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
            items: (orderData.items || []).map((item: any) => ({
              productId: item.product?.id || item.productId || 'unknown',
              name: item.product?.name || item.name || 'Unknown Product',
              price: Number(item.product?.price || item.price || 0),
              quantity: Number(item.quantity) || 1,
              image: item.product?.image || item.image || '',
              selectedSize: item.selectedSize,
            })),
            subtotal: Number(orderData.subtotal || orderData.total || 0),
            discountCode: orderData.discountCode || null,
            discountAmount: Number(orderData.discountAmount || 0),
            tax: Number(orderData.tax || 0),
            shipping: Number(orderData.shipping || 0),
            total: Number(orderData.total || 0),
            currency: 'USD',
            shippingAddress: normalizeShippingAddress(orderData.shippingAddress),
            status: 'PAID',
            paymentMethod: 'RAZORPAY',
            webhookVerified: false,
          });
          orderDoc = fallbackOrder;
          console.log(`[MongoDB] Fallback order created: ${receiptNumber} (order ${razorpay_order_id} was not pre-seeded)`);
        }
      }

      // Send order confirmation emails after successful payment verification
      if (orderDoc && !orderDoc.emailsSent) {
        const emailData = {
          receiptNumber: orderDoc.receiptNumber,
          items: orderDoc.items.map((item: any) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            selectedSize: item.selectedSize,
          })),
          subtotal: orderDoc.subtotal,
          discountCode: orderDoc.discountCode,
          discountAmount: orderDoc.discountAmount,
          tax: orderDoc.tax,
          shipping: orderDoc.shipping,
          total: orderDoc.total,
          currency: orderDoc.currency,
          shippingAddress: orderDoc.shippingAddress,
          status: orderDoc.status,
          razorpayOrderId: orderDoc.razorpayOrderId,
          razorpayPaymentId: orderDoc.razorpayPaymentId,
          createdAt: orderDoc.createdAt,
        };

        const results = await sendOrderConfirmationEmails(emailData);
        console.log('[Email] Order confirmation results:', results);

        // Mark emails as sent to prevent duplicates
        await Order.updateOne(
          { razorpayOrderId: razorpay_order_id },
          { $set: { emailsSent: true } }
        );
      }
    } catch (dbErr) {
      console.error('[MongoDB] Failed to update order after payment verification:', dbErr);
    }

    return NextResponse.json({
      success: true,
      verified: true,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      receiptNumber,
      message: 'Razorpay payment verified and order saved successfully',
    });
  } catch (error: any) {
    console.error('Error in Razorpay verify-payment:', error);
    return NextResponse.json(
      { error: error?.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
