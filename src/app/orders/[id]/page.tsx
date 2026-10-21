'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ShieldCheck,
  Package,
  Truck,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Printer,
  MapPin,
  User,
  Mail,
  Phone,
  CreditCard,
  FileText,
} from 'lucide-react';
import { formatUSD } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface Order {
  id: string;
  receiptNumber: string;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    selectedSize?: string;
  }>;
  subtotal: number;
  discountCode?: string;
  discountAmount: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  shippingAddress: {
    fullName: string;
    email: string;
    phone?: string;
    companyName?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    pincode?: string;
    country: string;
  };
  status: 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
  paymentMethod: 'RAZORPAY';
  webhookVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/orders');
    }
  }, [status, router]);

  const fetchOrder = useCallback(async () => {
    try {
      const res = await fetch(`/api/orders?orderId=${orderId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.order) {
          setOrder(data.order);
        } else {
          setNotFound(true);
        }
      } else if (res.status === 404) {
        setNotFound(true);
      }
    } catch (err) {
      console.error('Failed to fetch order:', err);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (session?.user && orderId) {
      fetchOrder();
    }
  }, [session, orderId, fetchOrder]);

  const getStatusConfig = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
        return { icon: Clock, color: 'text-amber-600 bg-amber-100', label: 'Payment Pending' };
      case 'PAID':
        return { icon: CheckCircle2, color: 'text-blue-600 bg-blue-100', label: 'Payment Confirmed' };
      case 'PROCESSING':
        return { icon: Clock, color: 'text-blue-600 bg-blue-100', label: 'Processing' };
      case 'SHIPPED':
        return { icon: Truck, color: 'text-amber-600 bg-amber-100', label: 'Shipped' };
      case 'DELIVERED':
        return { icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-100', label: 'Delivered' };
      case 'CANCELLED':
        return { icon: AlertCircle, color: 'text-red-600 bg-red-100', label: 'Cancelled' };
      case 'REFUNDED':
        return { icon: AlertCircle, color: 'text-stone-600 bg-stone-100', label: 'Refunded' };
      default:
        return { icon: ShieldCheck, color: 'text-stone-600 bg-stone-100', label: status };
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="bg-stone-50 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (!session?.user || notFound || !order) {
    return (
      <div className="bg-stone-50 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 text-center border border-stone-200/80">
          <AlertCircle className="w-16 h-16 mx-auto text-stone-300 mb-4" />
          <h1 className="text-2xl font-serif font-black text-stone-900 mb-2">Order Not Found</h1>
          <p className="text-stone-500 mb-6">This order doesn&apos;t exist or you don&apos;t have access to it.</p>
          <Link href="/orders">
            <Button>Back to Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/orders" className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Orders
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-serif font-black text-stone-900">Order Details</h1>
              <p className="text-stone-500 mt-1">{order.receiptNumber}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusConfig.color} flex items-center gap-1.5`}>
                <StatusIcon className="w-4 h-4" />
                {statusConfig.label}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Items */}
            <div className="bg-white rounded-3xl shadow-sm border border-stone-200/80 overflow-hidden">
              <div className="bg-stone-50 px-6 py-4 border-b border-stone-200">
                <h2 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                  <Package className="w-5 h-5 text-brand-500" />
                  Order Items ({order.items.length})
                </h2>
              </div>
              <div className="divide-y divide-stone-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="p-6 flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                      <Image src={item.image || '/static/images/logo.jpg'} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-stone-900">{item.name}</p>
                      {item.selectedSize && <p className="text-sm text-stone-500">Size: {item.selectedSize}</p>}
                      <p className="text-sm text-stone-500">Qty: {item.quantity} × {formatUSD(item.price)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-stone-900">{formatUSD(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-white rounded-3xl shadow-sm border border-stone-200/80 p-6">
              <h3 className="font-serif font-bold text-lg text-stone-900 mb-4 border-b border-stone-100 pb-3">Price Breakdown</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-medium">{formatUSD(order.subtotal)}</dd></div>
                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600"><dt>Discount ({order.discountCode})</dt><dd className="font-medium">-{formatUSD(order.discountAmount)}</dd></div>
                )}
                <div className="flex justify-between"><dt>Shipping</dt><dd className="font-medium">{order.shipping === 0 ? 'FREE' : formatUSD(order.shipping)}</dd></div>
                <div className="flex justify-between"><dt>Tax (5%)</dt><dd className="font-medium">{formatUSD(order.tax)}</dd></div>
                <div className="flex justify-between text-base font-bold text-brand-600 border-t border-stone-200 pt-3"><dt>Total</dt><dd>{formatUSD(order.total)}</dd></div>
              </dl>
            </div>
          </div>

          <div className="space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-3xl shadow-sm border border-stone-200/80 p-6">
              <h3 className="font-serif font-bold text-lg text-stone-900 mb-4 border-b border-stone-100 pb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-500" />
                Shipping Address
              </h3>
              <address className="not-italic space-y-1 text-sm text-stone-700">
                <p className="font-bold">{order.shippingAddress.fullName}</p>
                {order.shippingAddress.companyName && <p>{order.shippingAddress.companyName}</p>}
                <p>{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
                <p>{order.shippingAddress.country}</p>
                <p className="mt-2">
                  <Mail className="w-4 h-4 inline mr-1" /> {order.shippingAddress.email}
                </p>
                {order.shippingAddress.phone && (
                  <p><Phone className="w-4 h-4 inline mr-1" /> {order.shippingAddress.phone}</p>
                )}
              </address>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-3xl shadow-sm border border-stone-200/80 p-6">
              <h3 className="font-serif font-bold text-lg text-stone-900 mb-4 border-b border-stone-100 pb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-brand-500" />
                Payment Details
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-stone-500">Method</dt><dd className="font-medium">Razorpay</dd></div>
                <div className="flex justify-between"><dt className="text-stone-500">Order ID</dt><dd className="font-mono text-xs">{order.razorpayOrderId}</dd></div>
                {order.razorpayPaymentId && (
                  <div className="flex justify-between"><dt className="text-stone-500">Payment ID</dt><dd className="font-mono text-xs">{order.razorpayPaymentId}</dd></div>
                )}
                <div className="flex justify-between"><dt className="text-stone-500">Status</dt><dd className="font-medium capitalize">{order.status.toLowerCase()}</dd></div>
                <div className="flex justify-between"><dt className="text-stone-500">Webhook Verified</dt><dd className="font-medium">{order.webhookVerified ? 'Yes' : 'Pending'}</dd></div>
              </dl>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-3xl shadow-sm border border-stone-200/80 p-6">
              <h3 className="font-serif font-bold text-lg text-stone-900 mb-4 border-b border-stone-100 pb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-500" />
                Order Timeline
              </h3>
              <div className="space-y-4">
                <TimelineItem
                  icon={ShieldCheck}
                  color="text-brand-500"
                  title="Order Placed"
                  time={new Date(order.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                  description={`Order ${order.receiptNumber} created with ${order.items.length} item(s)`}
                  completed={true}
                />
                {order.status !== 'PENDING' && (
                  <TimelineItem
                    icon={CheckCircle2}
                    color="text-emerald-500"
                    title="Payment Confirmed"
                    time={new Date(order.updatedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                    description={`Payment verified via Razorpay (${order.razorpayPaymentId?.slice(-8) || 'processing'})`}
                    completed={true}
                  />
                )}
                {['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order.status) && (
                  <TimelineItem
                    icon={Package}
                    color="text-blue-500"
                    title="Processing"
                    time={order.status === 'PROCESSING' ? new Date(order.updatedAt).toLocaleString() : ''}
                    description="Order is being prepared at our Kanpur factory"
                    completed={['SHIPPED', 'DELIVERED'].includes(order.status)}
                    current={order.status === 'PROCESSING'}
                  />
                )}
                {['SHIPPED', 'DELIVERED'].includes(order.status) && (
                  <TimelineItem
                    icon={Truck}
                    color="text-amber-500"
                    title="Shipped"
                    time={order.status === 'SHIPPED' ? new Date(order.updatedAt).toLocaleString() : ''}
                    description="Order dispatched with tracking"
                    completed={order.status === 'DELIVERED'}
                    current={order.status === 'SHIPPED'}
                  />
                )}
                {order.status === 'DELIVERED' && (
                  <TimelineItem
                    icon={CheckCircle2}
                    color="text-emerald-500"
                    title="Delivered"
                    time={new Date(order.updatedAt).toLocaleString()}
                    description="Order delivered to customer"
                    completed={true}
                  />
                )}
                {order.status === 'CANCELLED' && (
                  <TimelineItem
                    icon={AlertCircle}
                    color="text-red-500"
                    title="Cancelled"
                    time={new Date(order.updatedAt).toLocaleString()}
                    description="Order was cancelled"
                    completed={true}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({
  icon: Icon,
  color,
  title,
  time,
  description,
  completed,
  current = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  title: string;
  time: string;
  description: string;
  completed: boolean;
  current?: boolean;
}) {
  return (
    <div className="flex gap-4 relative">
      <div className="flex flex-col items-center relative">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${completed ? `bg-${color.replace('text-', '').replace('-500', '-500')}` : 'bg-white'} border-${color.replace('text-', '')} z-10`}>
          <Icon className={`w-5 h-5 ${completed ? 'text-white' : color}`} />
        </div>
        {!completed && (
          <div className="absolute top-10 bottom-0 left-4.5 w-0.5 border-l-2 border-dashed border-stone-200" />
        )}
      </div>
      <div className="flex-1 pt-1">
        <div className="flex items-center gap-2">
          <h4 className={`font-semibold ${current ? 'text-brand-600' : 'text-stone-900'}`}>{title}</h4>
          {current && <span className="px-2 py-0.5 rounded text-xs font-medium bg-brand-100 text-brand-700">Current</span>}
        </div>
        {time && <p className="text-xs text-stone-500 mt-0.5">{time}</p>}
        <p className="text-sm text-stone-600 mt-1">{description}</p>
      </div>
    </div>
  );
}