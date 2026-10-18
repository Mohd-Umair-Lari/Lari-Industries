import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/razorpay';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing x-razorpay-signature header' },
        { status: 400 }
      );
    }

    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.warn('Invalid Razorpay webhook signature');
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 400 }
      );
    }

    const event = JSON.parse(rawBody);
    console.log(`[Razorpay Webhook Received]: ${event.event}`, event?.payload?.payment?.entity?.id);

    switch (event.event) {
      case 'payment.captured':
        // Handle captured payment
        break;
      case 'payment.failed':
        // Handle failed payment
        break;
      case 'order.paid':
        // Handle fully paid order
        break;
      default:
        console.log(`Unhandled event type ${event.event}`);
    }

    return NextResponse.json({ status: 'ok', received: true });
  } catch (error: any) {
    console.error('Error in Razorpay webhook handler:', error);
    return NextResponse.json(
      { error: error?.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
