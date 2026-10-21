import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/razorpay';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { sendOrderConfirmationEmails } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!rawBody) {
      return NextResponse.json({ error: 'Webhook body is required' }, { status: 400 });
    }

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing x-razorpay-signature header' },
        { status: 400 }
      );
    }

    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.warn('[Razorpay Webhook] Invalid signature received');
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    let event: {
      event?: string;
      payload?: {
        payment?: {
          entity?: {
            id?: string;
            order_id?: string;
            status?: string;
            amount?: number;
          };
        };
        order?: {
          entity?: {
            id?: string;
            status?: string;
          };
        };
      };
    };

    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid webhook JSON' }, { status: 400 });
    }

    const eventType = event.event;
    const paymentEntity = event.payload?.payment?.entity;
    const orderEntity = event.payload?.order?.entity;

    console.log(`[Razorpay Webhook] Event: ${eventType}`, {
      paymentId: paymentEntity?.id,
      orderId: paymentEntity?.order_id || orderEntity?.id,
    });

    try {
      await connectDB();

      switch (eventType) {
        case 'payment.captured': {
          const orderId = paymentEntity?.order_id;
          if (orderId) {
            const updatedOrder = await Order.findOneAndUpdate(
              { razorpayOrderId: orderId },
              {
                $set: {
                  razorpayPaymentId: paymentEntity?.id || '',
                  status: 'PAID',
                  webhookVerified: true,
                },
              },
              { new: true }
            );
            console.log(`[Webhook] Order ${orderId} marked as PAID via webhook`);

            // Send order confirmation emails if not already sent
            if (updatedOrder && !updatedOrder.emailsSent) {
              const emailData = {
                receiptNumber: updatedOrder.receiptNumber,
                items: updatedOrder.items.map((item: any) => ({
                  productId: item.productId,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image,
                  selectedSize: item.selectedSize,
                })),
                subtotal: updatedOrder.subtotal,
                discountCode: updatedOrder.discountCode,
                discountAmount: updatedOrder.discountAmount,
                tax: updatedOrder.tax,
                shipping: updatedOrder.shipping,
                total: updatedOrder.total,
                currency: updatedOrder.currency,
                shippingAddress: updatedOrder.shippingAddress,
                status: updatedOrder.status,
                razorpayOrderId: updatedOrder.razorpayOrderId,
                razorpayPaymentId: updatedOrder.razorpayPaymentId,
                createdAt: updatedOrder.createdAt,
              };

              const results = await sendOrderConfirmationEmails(emailData);
              console.log('[Email] Webhook order confirmation results:', results);

              await Order.updateOne(
                { razorpayOrderId: orderId },
                { $set: { emailsSent: true } }
              );
            }
          }
          break;
        }

        case 'payment.failed': {
          const orderId = paymentEntity?.order_id;
          if (orderId) {
            await Order.findOneAndUpdate(
              { razorpayOrderId: orderId, status: 'PENDING' },
              { $set: { status: 'CANCELLED' } }
            );
            console.log(`[Webhook] Order ${orderId} marked as CANCELLED`);
          }
          break;
        }

        case 'order.paid': {
          const orderId = orderEntity?.id;
          if (orderId) {
            await Order.findOneAndUpdate(
              { razorpayOrderId: orderId },
              { $set: { status: 'PROCESSING', webhookVerified: true } }
            );
            console.log(`[Webhook] Order ${orderId} moved to PROCESSING`);
          }
          break;
        }

        case 'refund.created': {
          const orderId = paymentEntity?.order_id;
          if (orderId) {
            await Order.findOneAndUpdate(
              { razorpayOrderId: orderId },
              { $set: { status: 'REFUNDED' } }
            );
          }
          break;
        }

        default:
          console.log(`[Webhook] Unhandled event type: ${eventType}`);
      }
    } catch (dbErr) {
      console.error('[Webhook] MongoDB update failed:', dbErr);
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
