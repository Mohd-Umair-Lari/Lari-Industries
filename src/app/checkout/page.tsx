'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Truck,
  Sparkles
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatUSD } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ShippingAddress } from '@/types/cart';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    subtotal,
    discountAmount,
    discountCode,
    tax,
    shipping,
    total,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    gstNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'United States',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsProcessing(true);

    try {
      if (!formData.fullName || !formData.email || !formData.addressLine1 || !formData.city) {
        setErrorMessage('Please complete all mandatory delivery fields (*).');
        setIsProcessing(false);
        return;
      }

      // Step 1: Call /api/razorpay/create-order
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          currency: 'USD',
          receipt: `rcpt_${Date.now()}`,
          notes: {
            customerName: formData.fullName,
            customerEmail: formData.email,
            company: formData.companyName || 'Individual',
          },
          items: cart.map((i) => ({
            id: i.product.id,
            name: i.product.name,
            qty: i.quantity,
          })),
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || orderData.error) {
        throw new Error(orderData.error || 'Failed to initialize payment gateway.');
      }

      // Step 2: Ensure Razorpay SDK is loaded
      if (typeof window === 'undefined' || !window.Razorpay) {
        throw new Error('Payment gateway SDK failed to load. Please check your connection and try again.');
      }

      // Step 3: Trigger official Razorpay Client Checkout Modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'USD',
        name: 'Lari Industries',
        description: `Order of ${cart.length} Safety Item(s)`,
        image: '/static/images/logo.jpg',
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData: {
                  items: cart,
                  total,
                  shippingAddress: formData,
                },
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              const completedOrder = {
                id: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                receiptNumber: verifyData.receiptNumber,
                items: cart,
                total,
                subtotal,
                tax,
                shipping,
                discountAmount,
                shippingAddress: formData,
                createdAt: new Date().toISOString(),
                paymentMethod: 'RAZORPAY',
              };
              localStorage.setItem('lari_last_order', JSON.stringify(completedOrder));
              clearCart();
              router.push(`/order-success?orderId=${encodeURIComponent(response.razorpay_order_id)}&receipt=${encodeURIComponent(verifyData.receiptNumber)}`);
            } else {
              setErrorMessage('Payment verification failed. Please contact customer support.');
            }
          } catch (err: any) {
            setErrorMessage(err?.message || 'Error verifying Razorpay transaction.');
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#e74c3c', // Lari Iconic Red
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on('payment.failed', function (response: any) {
        setErrorMessage(`Payment declined: ${response.error.description}`);
        setIsProcessing(false);
      });
      razorpayInstance.open();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err?.message || 'Unable to start checkout. Please try again.');
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-stone-50 min-h-[60vh] flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white p-8 rounded-3xl border border-stone-200">
          <h2 className="font-serif font-bold text-xl mb-2">No items to checkout</h2>
          <p className="text-sm text-stone-500 mb-6">Your shopping cart is currently empty.</p>
          <Link href="/products">
            <Button>Explore Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Cart
          </Link>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 tracking-tight">
            Checkout & Razorpay Payment
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Secure international checkout processed in US Dollars ($).
          </p>
        </div>

        {/* Razorpay Environment Notice Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-900 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs">
            <strong className="font-bold">Razorpay Integration Active:</strong> When live credentials are added in <code className="px-1.5 py-0.5 bg-white rounded border border-amber-300 font-mono">.env.local</code> or Vercel, the official Razorpay payment modal opens automatically. In the absence of live keys, our smart sandbox allows instant end-to-end order simulation.
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form: Delivery & Contact Information */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Contact Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/80 space-y-4">
              <h2 className="font-serif font-bold text-lg text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Contact Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">
                    Company Name (Optional B2B)
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Industrial Corp"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/80 space-y-4">
              <h2 className="font-serif font-bold text-lg text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>Shipping Address</span>
              </h2>

              <div>
                <label className="text-xs font-bold text-stone-700 mb-1 block">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  required
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  placeholder="Street name, suite, warehouse unit"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">
                    State / Region
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="ZIP / PIN Code"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 mb-1 block">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Australia">Australia</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="India">India</option>
                  <option value="Other">Other International Destination</option>
                </select>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/80 space-y-4">
              <h2 className="font-serif font-bold text-lg text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>Payment Method</span>
              </h2>

              <div className="p-4 rounded-2xl border-2 border-brand-500 bg-brand-50/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-500 text-white flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900">
                      Razorpay Global Gateway
                    </h3>
                    <p className="text-xs text-stone-500">
                      Supports International Visa, Mastercard, AMEX, UPI, NetBanking
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-100 text-brand-800">
                  USD ($)
                </span>
              </div>
            </div>
          </div>

          {/* Right Summary: Items & Payment Trigger */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/80 space-y-6 sticky top-28">
              <h2 className="font-serif font-black text-xl text-stone-900 border-b border-stone-100 pb-4">
                Order Review ({cart.length} items)
              </h2>

              {/* Items Mini List */}
              <div className="divide-y divide-stone-100 max-h-60 overflow-y-auto pr-2 space-y-3">
                {cart.map((item) => (
                  <div key={item.product.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-stone-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[11px] text-stone-500">
                        Qty: {item.quantity} × {formatUSD(item.product.price, item.product.priceUnit)}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-stone-900">
                      {formatUSD(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">{formatUSD(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({discountCode})</span>
                    <span>-{formatUSD(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-600">FREE</strong> : formatUSD(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (5%)</span>
                  <span>{formatUSD(tax)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-stone-900 border-t border-stone-200 pt-3">
                  <span>Total Payable</span>
                  <span className="text-brand-600 text-xl">{formatUSD(total)}</span>
                </div>
              </div>

              {/* Pay Button */}
              <Button
                type="submit"
                isLoading={isProcessing}
                className="w-full py-4 text-base bg-brand-500 hover:bg-brand-600 shadow-xl shadow-brand-500/25"
              >
                <Lock className="w-4 h-4 mr-2" />
                <span>Pay {formatUSD(total)} with Razorpay</span>
              </Button>

              <div className="text-[11px] text-stone-400 text-center space-y-1">
                <p>256-bit SSL encrypted connection.</p>
                <p>By completing payment, you agree to Lari Industries export terms.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
