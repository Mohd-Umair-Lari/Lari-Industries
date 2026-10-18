'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  CheckCircle2, 
  ShieldCheck, 
  Truck,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatUSD } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const {
    cart,
    subtotal,
    discountAmount,
    discountCode,
    tax,
    shipping,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage({ text: res.message, success: res.success });
    if (res.success) setPromoInput('');
  };

  const freeShippingThreshold = 50.00;
  const progress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const diff = Math.max(0, Number((freeShippingThreshold - subtotal).toFixed(2)));

  if (cart.length === 0) {
    return (
      <div className="bg-stone-50 min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 text-center shadow-sm border border-stone-200/80 space-y-4">
          <div className="w-20 h-20 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="font-serif font-black text-2xl sm:text-3xl text-stone-900">
            Your Cart is Empty
          </h1>
          <p className="text-stone-500 text-sm leading-relaxed">
            You haven&apos;t added any industrial leather safety gear to your cart yet. All our catalog items are quoted directly in US Dollars ($).
          </p>
          <div className="pt-4">
            <Link href="/products">
              <Button size="lg" className="w-full">
                <span>Browse Products (USD)</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-stone-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {cart.length} distinct item types • Prices formatted in US Dollars ($)
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-stone-400 hover:text-red-600 font-semibold transition-colors self-start sm:self-auto"
          >
            Clear All Items
          </button>
        </div>

        {/* Free Shipping Notification Banner */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-sm mb-8">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-stone-700 mb-2">
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-600" />
              {diff > 0 ? (
                <>Add <strong className="text-brand-600">${diff.toFixed(2)}</strong> more in products to qualify for <strong>FREE Shipping</strong></>
              ) : (
                <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> You have qualified for FREE Shipping!
                </span>
              )}
            </span>
            <span className="text-stone-400 font-bold">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Table / Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-200/80 divide-y divide-stone-100">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between"
                >
                  <div className="flex gap-4 items-center flex-1 min-w-0">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-stone-50 flex-shrink-0 border border-stone-200/70">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 block">
                        {item.product.category}
                      </span>
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-serif font-bold text-base sm:text-lg text-stone-900 hover:text-brand-600 transition-colors truncate block"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Unit Price: <strong>{formatUSD(item.product.price, item.product.priceUnit)}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Quantity and Controls */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-stone-200 text-stone-600 rounded-l-xl transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-xs font-bold text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-stone-200 text-stone-600 rounded-r-xl transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <span className="font-serif font-bold text-base sm:text-lg text-stone-900 block">
                        {formatUSD(item.product.price * item.quantity)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-stone-400 hover:text-red-500 rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/80 space-y-6">
            <h2 className="font-serif font-black text-xl text-stone-900 border-b border-stone-100 pb-4">
              Order Summary
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 block">
                Promo Code
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-3 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    placeholder="e.g. SAFETY10"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className={`text-xs ${promoMessage.success ? 'text-emerald-600' : 'text-red-500'}`}>
                  {promoMessage.text}
                </p>
              )}
              {discountCode && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-2 rounded-xl border border-emerald-200">
                  <span>Code <strong>{discountCode}</strong> applied</span>
                  <button
                    type="button"
                    onClick={removePromoCode}
                    className="underline font-bold text-emerald-900"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            {/* Line Item Totals in USD */}
            <div className="space-y-3 text-sm text-stone-600 border-t border-stone-100 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">{formatUSD(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Promotional Discount</span>
                  <span>-{formatUSD(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Standard Shipping</span>
                <span>{shipping === 0 ? <strong className="text-emerald-600">FREE</strong> : formatUSD(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Export Tax (5%)</span>
                <span>{formatUSD(tax)}</span>
              </div>
              <div className="flex justify-between text-lg font-black text-stone-900 border-t border-stone-200 pt-4">
                <span>Total Amount (USD)</span>
                <span className="text-brand-600">{formatUSD(total)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-base shadow-xl shadow-brand-500/25 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Trust Assurance */}
            <div className="pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Powered by Razorpay Secure 256-bit encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>Kanpur Certified Manufacturer Direct Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
