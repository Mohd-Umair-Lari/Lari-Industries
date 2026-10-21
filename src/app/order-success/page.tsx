'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Printer, 
  Package, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Calendar 
} from 'lucide-react';
import { formatUSD } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'LARI-ORD-2026';
  const receipt = searchParams.get('receipt') || 'LARI-INV-2026-9921';

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e74c3c', '#d97706', '#10b981', '#3b82f6'],
      });
    } catch (e) {}

    try {
      const saved = localStorage.getItem('lari_last_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-stone-200/80 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Payment Confirmed via Razorpay
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-stone-900 tracking-tight mt-3">
              Thank You for Your Order!
            </h1>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-lg mx-auto">
              Your industrial safety order has been successfully placed and transmitted to our manufacturing factory in Kanpur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left text-xs">
            <div>
              <span className="text-stone-400 block font-medium">Order Reference:</span>
              <span className="font-mono font-bold text-stone-900 text-sm break-all">{orderId}</span>
            </div>
            <div>
              <span className="text-stone-400 block font-medium">Official Invoice Number:</span>
              <span className="font-mono font-bold text-brand-600 text-sm break-all">{receipt}</span>
            </div>
          </div>

          {order && order.items && (
            <div className="border border-stone-200 rounded-2xl p-6 text-left space-y-4">
              <h3 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <Package className="w-4 h-4 text-brand-500" />
                <span>Purchased Items</span>
              </h3>

              <div className="divide-y divide-stone-100 text-xs">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="py-2.5 flex justify-between items-center">
                    <div>
                      <strong className="text-stone-800">{item.product.name}</strong>
                      <span className="text-stone-400 ml-2">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-bold text-stone-900">
                      {formatUSD(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-200 pt-3 flex justify-between items-center text-sm font-bold text-stone-900">
                <span>Total Paid (USD)</span>
                <span className="text-brand-600 text-lg">{formatUSD(order.total)}</span>
              </div>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-left text-xs text-blue-900 flex items-start gap-3">
            <Truck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold">Next Steps & Tracking:</p>
              <p className="text-blue-800 mt-0.5">
                A confirmation receipt has been dispatched to your email. Our Kanpur logistics coordinator will provide your air-waybill tracking reference as soon as goods leave our factory.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-stone-100">
            <Button onClick={handlePrint} variant="outline" className="px-6">
              <Printer className="w-4 h-4 mr-2" />
              <span>Print Invoice</span>
            </Button>
            <Link href="/products">
              <Button className="px-8">
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading order confirmation...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
