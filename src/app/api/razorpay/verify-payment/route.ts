import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpaySignature, isRazorpayConfigured } from '@/lib/razorpay';

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
        { success: false, error: 'Cryptographic signature mismatch. Payment verification failed.' },
        { status: 400 }
      );
    }

    const receiptNumber = `LARI-INV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    return NextResponse.json({
      success: true,
      verified: true,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      receiptNumber,
      message: 'Razorpay payment verified successfully',
    });
  } catch (error: any) {
    console.error('Error in Razorpay verify-payment:', error);
    return NextResponse.json(
      { error: error?.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
