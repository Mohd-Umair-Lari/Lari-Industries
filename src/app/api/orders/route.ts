import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

export const dynamic = 'force-dynamic';

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
