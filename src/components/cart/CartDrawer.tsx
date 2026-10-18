'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  CheckCircle2, 
  Truck
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatUSD } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    subtotal,
    discountAmount,
    discountCode,
    tax,
    shipping,
    total,
    updateQuantity,
    removeFromCart,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage({ text: res.message, success: res.success });
    if (res.success) {
      setPromoInput('');
    }
  };

  const freeShippingThreshold = 50.00;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, Number((freeShippingThreshold - subtotal).toFixed(2)));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white/95 backdrop-blur-2xl shadow-2xl flex flex-col border-l border-stone-200">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-600" />
              <h2 className="font-serif font-bold text-lg text-stone-900">
                Your Safety Cart
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 font-bold">
                {cart.length} items
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-stone-200/60 text-stone-500 hover:text-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-brand-50/50 border-b border-brand-100/50">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-brand-600" />
                {amountNeeded > 0 ? (
                  <>Add <strong className="text-brand-600">${amountNeeded.toFixed(2)}</strong> more for FREE Shipping</>
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> You unlocked FREE Shipping!
                  </span>
                )}
              </span>
              <span className="text-stone-500">{progressToFreeShipping}%</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-500 rounded-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-800">
                  Your cart is empty
                </h3>
                <p className="text-sm text-stone-500 max-w-xs mx-auto">
                  Browse our high-grade industrial leather gloves, welding aprons, and safety gear.
                </p>
                <Button
                  onClick={closeCart}
                  className="mt-2"
                >
                  <Link href="/products">Explore Products</Link>
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 rounded-2xl bg-white border border-stone-100 shadow-sm hover:border-stone-200 transition-all"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-50 flex-shrink-0 border border-stone-200/60">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-semibold text-stone-900 text-sm hover:text-brand-600 truncate transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-red-500 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-stone-500">{item.product.category}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-stone-200 rounded-l text-stone-600 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-stone-200 rounded-r text-stone-600 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-stone-900">
                          {formatUSD(item.product.price * item.quantity)}
                        </span>
                        <div className="text-[10px] text-stone-500">
                          {formatUSD(item.product.price, item.product.priceUnit)} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 pb-safe border-t border-stone-200 bg-stone-50/70 space-y-4">
              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-2.5 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. SAFETY10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-stone-800 hover:bg-stone-900 text-white transition-colors"
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
                  <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200">
                    <span>Applied: <strong>{discountCode}</strong> (-{formatUSD(discountAmount)})</span>
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="text-emerald-700 hover:text-emerald-950 font-bold ml-2 underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatUSD(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span>-{formatUSD(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping (Standard)</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-600">FREE</strong> : formatUSD(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (5%)</span>
                  <span>{formatUSD(tax)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-300">
                  <span>Total (USD)</span>
                  <span className="text-brand-600">{formatUSD(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full block text-center py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:underline"
                >
                  View Full Cart & Shipping Calculator
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
