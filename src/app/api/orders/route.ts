import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

// Explicitly dynamic — reads query params from request.url
export const dynamic = 'force-dynamic';

/**
 * GET /api/orders?email=customer@email.com
 * Returns all orders for the given email address.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const orderId = searchParams.get('orderId');

    if (!email && !orderId) {
      return NextResponse.json(
        { error: 'Provide email or orderId query parameter' },
        { status: 400 }
      );
    }

    await connectDB();

    if (orderId) {
      const order = await Order.findOne({ razorpayOrderId: orderId })
        .select('-razorpaySignature -__v')
        .lean();

      if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
      }
      return NextResponse.json({ order });
    }

    // Lookup by email (most recent first, limit 20)
    const orders = await Order.find({ 'shippingAddress.email': email!.toLowerCase() })
      .sort({ createdAt: -1 })
      .limit(20)
      .select('-razorpaySignature -__v')
      .lean();

    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error('[GET /api/orders]', error);
    return NextResponse.json({ error: 'Failed to retrieve orders' }, { status: 500 });
  }
}
