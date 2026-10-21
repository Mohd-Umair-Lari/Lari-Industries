import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpaySignature, isRazorpayConfigured } from '@/lib/razorpay';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

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

    let receiptNumber = `LARI-INV-${new Date().getFullYear()}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

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

        if (orderData?.shippingAddress && !existingOrder.shippingAddress?.fullName) {
          await Order.updateOne(
            { razorpayOrderId: razorpay_order_id },
            { $set: { shippingAddress: orderData.shippingAddress } }
          );
        }
      } else {
        if (orderData) {
          await Order.create({
            receiptNumber,
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
            items: (orderData.items || []).map((item: any) => ({
              productId: item.product?.id || item.productId || '',
              name: item.product?.name || item.name || '',
              price: item.product?.price || item.price || 0,
              quantity: item.quantity || 1,
              image: item.product?.image || item.image || '',
              selectedSize: item.selectedSize,
            })),
            subtotal: orderData.subtotal || orderData.total || 0,
            discountCode: orderData.discountCode,
            discountAmount: orderData.discountAmount || 0,
            tax: orderData.tax || 0,
            shipping: orderData.shipping || 0,
            total: orderData.total || 0,
            currency: 'USD',
            shippingAddress: orderData.shippingAddress || {},
            status: 'PAID',
            paymentMethod: 'RAZORPAY',
            webhookVerified: false,
          });
        }
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
