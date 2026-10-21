'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  ShieldCheck,
  MapPin,
  Settings,
  LogOut,
  Bell,
  CreditCard,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Order {
  id: string;
  receiptNumber: string;
  total: number;
  status: string;
  createdAt: string;
  items: Array<{ name: string; quantity: number }>;
}

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'settings'>('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/account');
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
      setLoadingOrders(false);
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

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'My Orders', icon: ShieldCheck },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 mb-4">
            <Image src="/static/images/logo.jpg" alt="" className="w-5 h-5" />
            Lari Industries
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center">
              {session.user.image ? (
                <Image src={session.user.image} alt="" className="w-20 h-20 rounded-full" />
              ) : (
                <User className="w-10 h-10 text-brand-600" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-serif font-black text-stone-900">{session.user.name || 'Customer'}</h1>
              <p className="text-sm text-stone-500">{session.user.email}</p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active Account
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200/80 overflow-hidden">
          <div className="border-b border-stone-200">
            <nav className="flex -mb-px overflow-x-auto" aria-label="Account tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'text-brand-600 border-brand-500 bg-brand-50'
                      : 'text-stone-500 border-transparent hover:text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'profile' && (
              <ProfileTab user={session.user} />
            )}
            {activeTab === 'orders' && (
              <OrdersTab orders={orders} loading={loadingOrders} onRefresh={fetchOrders} />
            )}
            {activeTab === 'addresses' && (
              <AddressesTab />
            )}
            {activeTab === 'settings' && (
              <SettingsTab onSignOut={() => router.push('/api/auth/signout?callbackUrl=/')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ user }: { user: any }) {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="bg-stone-50 rounded-2xl p-6">
        <h3 className="font-serif font-bold text-lg text-stone-900 mb-4">Account Information</h3>
        <dl className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <dt className="text-sm text-stone-500">Full Name</dt>
            <dd className="sm:col-span-2 font-medium text-stone-900">{user.name || 'Not set'}</dd>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <dt className="text-sm text-stone-500">Email</dt>
            <dd className="sm:col-span-2 font-medium text-stone-900">{user.email}</dd>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <dt className="text-sm text-stone-500">Member Since</dt>
            <dd className="sm:col-span-2 font-medium text-stone-900">
              {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
            </dd>
          </div>
        </dl>
      </div>

      <div className="flex gap-3">
        <Link href="/orders">
          <Button variant="outline">
            <ShieldCheck className="w-4 h-4 mr-2" />
            View Orders
          </Button>
        </Link>
        <Link href="/checkout">
          <Button>
            <CreditCard className="w-4 h-4 mr-2" />
            New Order
          </Button>
        </Link>
      </div>
    </div>
  );
}

function OrdersTab({ orders, loading, onRefresh }: { orders: Order[]; loading: boolean; onRefresh: () => void }) {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <ShieldCheck className="w-16 h-16 mx-auto text-stone-300 mb-4" />
        <h3 className="text-lg font-semibold text-stone-900 mb-2">No Orders Yet</h3>
        <p className="text-stone-500 mb-6">Your order history will appear here.</p>
        <Link href="/products">
          <Button>
            <CreditCard className="w-4 h-4 mr-2" />
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Link key={order.id} href={`/orders/${order.id}`} className="block">
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 hover:border-brand-300 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-mono text-sm font-bold text-stone-900">{order.receiptNumber}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' :
                    order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'SHIPPED' ? 'bg-amber-100 text-amber-700' :
                    order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-stone-100 text-stone-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-stone-500 mt-1">
                  {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  {order.items.length} item{order.items.length > 1 ? 's' : ''} • {order.items.map(i => `${i.name} (×${i.quantity})`).join(', ')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-brand-600">${order.total.toFixed(2)}</p>
                <p className="text-xs text-stone-400">USD</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function AddressesTab() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif font-bold text-lg text-stone-900">Saved Addresses</h3>
        <Link href="/checkout">
          <Button size="sm">
            <MapPin className="w-4 h-4 mr-2" />
            Manage at Checkout
          </Button>
        </Link>
      </div>
      <div className="bg-stone-50 rounded-2xl p-8 text-center">
        <MapPin className="w-12 h-12 mx-auto text-stone-300 mb-3" />
        <h4 className="text-lg font-semibold text-stone-900 mb-2">Manage Addresses at Checkout</h4>
        <p className="text-stone-500 mb-6">Add, edit, and set default addresses during checkout for a faster experience.</p>
        <Link href="/checkout">
          <Button>
            <MapPin className="w-4 h-4 mr-2" />
            Go to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
}

function SettingsTab({ onSignOut }: { onSignOut: () => void }) {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-stone-50 rounded-2xl p-6">
        <h3 className="font-serif font-bold text-lg text-stone-900 mb-4">Security</h3>
        <p className="text-stone-500 mb-4">Your account is secured with email/password authentication.</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-stone-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-stone-900">Change Password</p>
                <p className="text-sm text-stone-500">Update your account password</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Update</Button>
          </div>
        </div>
      </div>

      <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
        <h3 className="font-serif font-bold text-lg text-red-900 mb-3 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Danger Zone
        </h3>
        <p className="text-red-700 mb-4">Once you sign out, you&apos;ll need to sign in again to access your account.</p>
        <button
          onClick={onSignOut}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}