import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { isRazorpayConfigured } from '@/lib/razorpay';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency = 'USD', receipt, notes, items } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Valid order amount is required' },
        { status: 400 }
      );
    }

    // In Razorpay, amount is passed in the smallest currency sub-unit:
    // For USD: Cents (1 USD = 100 cents)
    const amountInSubunits = Math.round(Number(amount) * 100);

    const configured = isRazorpayConfigured();

    if (!configured) {
      return NextResponse.json(
        { error: 'Payment gateway configuration is missing or inactive. Please contact store support.' },
        { status: 503 }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: amountInSubunits,
      currency: currency.toUpperCase(),
      receipt: receipt || `lari_${Date.now().toString().slice(-8)}`,
      notes: {
        company: 'Lari Industries Kanpur',
        itemsCount: items ? items.length.toString() : '1',
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
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error('Error in Razorpay create-order:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to initialize Razorpay order' },
      { status: 500 }
    );
  }
}
