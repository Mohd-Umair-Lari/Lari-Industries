'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn } from 'next-auth/react';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Truck,
  Sparkles,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Home,
  Building2,
  User,
  Loader2,
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

interface SavedAddress extends ShippingAddress {
  _id: string;
  label: string;
  isDefault: boolean;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
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
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('credentials', { callbackUrl: '/checkout' });
    }
  }, [status]);

  useEffect(() => {
    if (session?.user) {
      fetchAddresses();
    }
  }, [session]);

  const populateForm = useCallback((address: SavedAddress) => {
    setFormData({
      fullName: address.fullName,
      email: address.email,
      phone: address.phone || '',
      companyName: address.companyName || '',
      gstNumber: address.gstNumber || '',
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || '',
      city: address.city,
      state: address.state || '',
      pincode: address.pincode || '',
      country: address.country,
    });
  }, []);

  const fetchAddresses = useCallback(async () => {
    try {
      const res = await fetch('/api/addresses');
      if (res.ok) {
        const data = await res.json();
        setSavedAddresses(data.addresses);
        const defaultAddr = data.addresses.find((a: SavedAddress) => a.isDefault);
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr._id);
          populateForm(defaultAddr);
        }
      }
    } catch (err) {
      console.error('Failed to fetch addresses:', err);
    } finally {
      setIsLoadingAddresses(false);
    }
  }, [populateForm]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('credentials', { callbackUrl: '/checkout' });
    }
  }, [status]);

  useEffect(() => {
    if (session?.user) {
      fetchAddresses();
    }
  }, [session, fetchAddresses]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const url = editingAddressId
        ? `/api/addresses/${editingAddressId}`
        : '/api/addresses';
      const method = editingAddressId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          label: editingAddressId ? undefined : `Address ${savedAddresses.length + 1}`,
          isDefault: savedAddresses.length === 0,
        }),
      });

      if (!res.ok) throw new Error('Failed to save address');

      await fetchAddresses();
      setShowAddressForm(false);
      setEditingAddressId(null);
    } catch (err) {
      setErrorMessage('Failed to save address. Please try again.');
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm('Delete this address?')) return;

    try {
      const res = await fetch(`/api/addresses/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete address');
      await fetchAddresses();
      if (selectedAddressId === id) {
        setSelectedAddressId(null);
        setFormData({
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
      }
    } catch (err) {
      setErrorMessage('Failed to delete address.');
    }
  };

  const handleEditAddress = (address: SavedAddress) => {
    setEditingAddressId(address._id);
    populateForm(address);
    setShowAddressForm(true);
    setSelectedAddressId(address._id);
  };

  const handleSelectAddress = (address: SavedAddress) => {
    setSelectedAddressId(address._id);
    populateForm(address);
    setShowAddressForm(false);
    setEditingAddressId(null);
  };

  const handleSetDefault = async (id: string) => {
    try {
      const address = savedAddresses.find((a) => a._id === id);
      if (!address) return;

      const res = await fetch(`/api/addresses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...address, isDefault: true }),
      });

      if (res.ok) {
        await fetchAddresses();
      }
    } catch (err) {
      setErrorMessage('Failed to set default address.');
    }
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
            selectedSize: i.selectedSize,
          })),
          discountCode,
          shippingAddress: formData,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || orderData.error) {
        throw new Error(orderData.error || 'Failed to initialize payment gateway.');
      }

      if (typeof window === 'undefined' || !window.Razorpay) {
        throw new Error('Payment gateway SDK failed to load.');
      }

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
                  subtotal,
                  discountAmount,
                  discountCode,
                  tax,
                  shipping,
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
              router.push(
                `/order-success?orderId=${encodeURIComponent(response.razorpay_order_id)}&receipt=${encodeURIComponent(verifyData.receiptNumber)}`
              );
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
        theme: { color: '#e74c3c' },
        modal: { ondismiss: () => setIsProcessing(false) },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on('payment.failed', (response: any) => {
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

  if (status === 'loading') {
    return (
      <div className="bg-stone-50 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (status === 'unauthenticated' || !session) {
    return (
      <div className="bg-stone-50 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-stone-200/80 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-brand-100 flex items-center justify-center">
            <Lock className="w-8 h-8 text-brand-500" />
          </div>
          <h1 className="text-2xl font-serif font-black text-stone-900 mb-2">Sign In Required</h1>
          <p className="text-stone-500 mb-6">Please sign in to proceed with checkout and save your order history.</p>
          <Button onClick={() => signIn('credentials', { callbackUrl: '/checkout' })} className="w-full py-3">
            Sign In to Continue
          </Button>
          <p className="mt-4 text-sm text-stone-500">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="font-bold text-brand-500 hover:text-brand-600">
              Create one
            </Link>
          </p>
        </div>
      </div>
    );
  }

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
          <Link href="/cart" className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Cart
          </Link>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 tracking-tight">Checkout & Payment</h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">Secure checkout in USD. Your addresses are saved for future orders.</p>
        </div>

        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-900 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs">
            <strong className="font-bold">Razorpay Integration Active:</strong> Live credentials in Vercel enable real payments. Sandbox mode allows end-to-end simulation.
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            {/* Saved Addresses Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/80 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif font-bold text-lg text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">1</span>
                  <span>Shipping Address</span>
                </h2>
                <Button variant="outline" size="sm" onClick={() => { setShowAddressForm(true); setEditingAddressId(null); setSelectedAddressId(null); }}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add New
                </Button>
              </div>

              {isLoadingAddresses ? (
                <div className="flex justify-center py-4"><Loader2 className="w-6 h-6 animate-spin text-brand-500" /></div>
              ) : savedAddresses.length === 0 ? (
                <div className="text-center py-8 text-stone-500 border-2 border-dashed border-stone-200 rounded-2xl">
                  <MapPin className="w-10 h-10 mx-auto text-stone-300 mb-2" />
                  <p className="text-sm">No saved addresses. Add one below.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedAddresses.map((address) => (
                    <div
                      key={address._id}
                      className={`relative p-4 rounded-xl border-2 transition-colors cursor-pointer ${
                        selectedAddressId === address._id
                          ? 'border-brand-500 bg-brand-50'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                      onClick={() => handleSelectAddress(address)}
                    >
                      {selectedAddressId === address._id && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          address.label.toLowerCase().includes('home') ? 'bg-emerald-100 text-emerald-600' :
                          address.label.toLowerCase().includes('office') || address.label.toLowerCase().includes('work') ? 'bg-blue-100 text-blue-600' :
                          'bg-amber-100 text-amber-600'
                        }`}>
                          {address.label.toLowerCase().includes('home') ? <Home className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-stone-900">{address.label}</span>
                            {address.isDefault && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">Default</span>
                            )}
                          </div>
                          <p className="text-sm text-stone-700">{address.fullName}</p>
                          <p className="text-xs text-stone-500 truncate">{address.addressLine1}</p>
                          <p className="text-xs text-stone-500">
                            {address.city}, {address.state} {address.pincode}, {address.country}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                          <button onClick={(e) => { e.stopPropagation(); handleEditAddress(address); }} className="p-1.5 text-stone-400 hover:text-brand-500 rounded-lg hover:bg-brand-50" aria-label="Edit">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteAddress(address._id); }} className="p-1.5 text-stone-400 hover:text-red-500 rounded-lg hover:bg-red-50" aria-label="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          {!address.isDefault && (
                            <button onClick={(e) => { e.stopPropagation(); handleSetDefault(address._id); }} className="p-1.5 text-stone-400 hover:text-brand-500 rounded-lg hover:bg-brand-50" aria-label="Set default">
                              <MapPin className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Address Form */}
            {(showAddressForm || savedAddresses.length === 0) && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/80 space-y-4">
                <h3 className="font-serif font-bold text-lg text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">
                    {editingAddressId ? '✏️' : '+'}
                  </span>
                  <span>{editingAddressId ? 'Edit Address' : 'Add New Address'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 mb-1 block">Label *</label>
                    <input type="text" name="label" required value={editingAddressId ? '' : `Address ${savedAddresses.length + 1}`} onChange={handleInputChange} placeholder="Home, Office, Warehouse" className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 mb-1 block">Full Name *</label>
                    <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} placeholder="John Doe" className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 mb-1 block">Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="john@example.com" className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 mb-1 block">Phone *</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 mb-1 block">Company (Optional)</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Industrial Corp" className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">Street Address *</label>
                  <input type="text" name="addressLine1" required value={formData.addressLine1} onChange={handleInputChange} placeholder="Street name, suite, warehouse unit" className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">Address Line 2 (Optional)</label>
                  <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleInputChange} placeholder="Apt, suite, floor" className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 mb-1 block">City *</label>
                    <input type="text" name="city" required value={formData.city} onChange={handleInputChange} placeholder="City" className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 mb-1 block">State / Region</label>
                    <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 mb-1 block">Postal Code *</label>
                    <input type="text" name="pincode" required value={formData.pincode} onChange={handleInputChange} placeholder="ZIP / PIN" className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">Country *</label>
                  <select name="country" value={formData.country} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white">
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

                <div className="flex gap-3 pt-2">
                  <Button type="button" onClick={handleSaveAddress} className="flex-1">
                    {editingAddressId ? 'Update Address' : 'Save Address'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setShowAddressForm(false); setEditingAddressId(null); }} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/80 space-y-4">
              <h2 className="font-serif font-bold text-lg text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>Contact Information</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">Email *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="john@example.com" className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">Phone *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
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
                    <h3 className="font-bold text-sm text-stone-900">Razorpay Global Gateway</h3>
                    <p className="text-xs text-stone-500">Visa, Mastercard, AMEX, UPI, NetBanking</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-brand-100 text-brand-800">USD ($)</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-stone-200/80 space-y-6 sticky top-28">
              <h2 className="font-serif font-black text-xl text-stone-900 border-b border-stone-100 pb-4">Order Review ({cart.length} items)</h2>

              <div className="divide-y divide-stone-100 max-h-60 overflow-y-auto pr-2 space-y-3">
                {cart.map((item) => (
                  <div key={item.product.id} className="pt-3 first:pt-0 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-stone-900 truncate">{item.product.name}</p>
                      <p className="text-[11px] text-stone-500">Qty: {item.quantity} × {formatUSD(item.product.price, item.product.priceUnit)}</p>
                    </div>
                    <span className="text-xs font-bold text-stone-900">{formatUSD(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-4">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold text-stone-900">{formatUSD(subtotal)}</span></div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold"><span>Discount ({discountCode})</span><span>-{formatUSD(discountAmount)}</span></div>
                )}
                <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? <strong className="text-emerald-600">FREE</strong> : formatUSD(shipping)}</span></div>
                <div className="flex justify-between"><span>Tax (5%)</span><span>{formatUSD(tax)}</span></div>
                <div className="flex justify-between text-base font-black text-stone-900 border-t border-stone-200 pt-3">
                  <span>Total Payable</span><span className="text-brand-600 text-xl">{formatUSD(total)}</span>
                </div>
              </div>

              <Button type="submit" isLoading={isProcessing} className="w-full py-4 text-base bg-brand-500 hover:bg-brand-600 shadow-xl shadow-brand-500/25">
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