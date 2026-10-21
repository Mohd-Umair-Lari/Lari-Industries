'use client';

import React, { useEffect, useState } from 'react';
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
  Eye,
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

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/orders');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchOrders();
    }
  }, [session]);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
        return { icon: Clock, color: 'text-amber-600 bg-amber-100', label: 'Pending' };
      case 'PAID':
        return { icon: CheckCircle2, color: 'text-blue-600 bg-blue-100', label: 'Paid' };
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

  if (status === 'loading') {
    return (
      <div className="bg-stone-50 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/account" className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 mb-4">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Account
          </Link>
          <h1 className="text-3xl font-serif font-black text-stone-900">My Orders</h1>
          <p className="text-stone-500 mt-1">Track and manage your order history</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80">
            <ShieldCheck className="w-16 h-16 mx-auto text-stone-300 mb-4" />
            <h3 className="text-xl font-semibold text-stone-900 mb-2">No Orders Yet</h3>
            <p className="text-stone-500 mb-6 max-w-md mx-auto">Your order history will appear here once you place an order.</p>
            <Link href="/products">
              <Button>
                <Package className="w-4 h-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div key={order.id} className="bg-white rounded-3xl shadow-sm border border-stone-200/80 overflow-hidden">
                  <Link href={`/orders/${order.id}`} className="block">
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 flex-wrap mb-2">
                            <span className="font-mono text-sm font-bold text-stone-900">{order.receiptNumber}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                              <StatusIcon className="w-3 h-3 inline mr-1" />
                              {statusConfig.label}
                            </span>
                            {order.razorpayOrderId && (
                              <span className="px-2 py-0.5 rounded text-xs font-medium bg-stone-100 text-stone-600 font-mono">
                                {order.razorpayOrderId.slice(-8)}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-stone-500">
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                        <div className="text-right sm:w-48">
                          <p className="text-2xl font-black text-brand-600">{formatUSD(order.total)}</p>
                          <p className="text-xs text-stone-400">USD</p>
                        </div>
                      </div>

                      <div className="border-t border-stone-100 pt-4">
                        <div className="flex flex-wrap gap-3">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                                <Image
                                  src={item.image || '/static/images/logo.jpg'}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-stone-900 truncate max-w-[150px]">{item.name}</p>
                                <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="flex items-center gap-2 text-sm text-stone-500">
                              +{order.items.length - 3} more item{order.items.length - 3 > 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="bg-stone-50 px-6 py-4 border-t border-stone-100">
                    <Link
                      href={`/orders/${order.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700"
                    >
                      View Details <Eye className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}