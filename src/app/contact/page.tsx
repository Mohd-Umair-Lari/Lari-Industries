'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Building,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

function ContactContent() {
  const searchParams = useSearchParams();
  const productInterest = searchParams.get('product') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: productInterest ? `Bespoke Quote for ${productInterest}` : '',
    message: productInterest
      ? `Hello, I would like to request custom choice specifications and pricing in USD for ${productInterest}. Please provide container/bulk options.`
      : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  useEffect(() => {
    if (productInterest) {
      setFormData((prev) => ({
        ...prev,
        subject: `Bespoke Quote for ${productInterest}`,
        message: `Hello, I would like to request custom choice specifications and pricing in USD for ${productInterest}.`,
      }));
    }
  }, [productInterest]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({
          success: true,
          message:
            'Thank you for contacting Lari Industries! Your inquiry has been received. Our Kanpur sales team will follow up within 24 hours.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
        });
      } else {
        setStatus({
          success: false,
          message: data.error || 'Failed to submit form. Please email Larindustries@gmail.com directly.',
        });
      }
    } catch (err: any) {
      setStatus({
        success: false,
        message: 'Network error. Please call +91 99566 75648 directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-xs font-bold uppercase tracking-wider">
            <Building className="w-3.5 h-3.5" />
            <span>Direct Manufacturer Communication</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-black text-stone-900 tracking-tight">
            Reach Out to Us
          </h1>
          <p className="text-stone-600 text-sm sm:text-base">
            We welcome inquiries from international distributors, procurement managers, and industrial enterprises. Get in touch for custom leather strap dimensions, container quotations, and B2B pricing in USD.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm space-y-6">
              <h2 className="font-serif font-bold text-xl text-stone-900 border-b border-stone-100 pb-3">
                Factory & Headquarters
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">Office & Works Address</h3>
                    <p className="text-stone-600 mt-0.5 leading-relaxed">
                      C-33 CHANDRA NAGAR, LAL BANGLAW,<br />
                      KANPUR - 208007, UTTAR PRADESH, INDIA
                    </p>
                    <span className="text-[10px] text-stone-400 block mt-1">
                      Located in Kanpur Leather Industrial Zone
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">Phone & WhatsApp</h3>
                    <p className="text-stone-600 mt-0.5">
                      <a href="tel:+919956675648" className="hover:text-brand-600 font-semibold">
                        +91 99566 75648
                      </a>
                    </p>
                    <span className="text-[10px] text-stone-400 block mt-1">
                      Response within 2-4 business hours
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">Email Inquiries</h3>
                    <p className="text-stone-600 mt-0.5">
                      <a href="mailto:Larindustries@gmail.com" className="hover:text-brand-600 font-semibold">
                        Larindustries@gmail.com
                      </a>
                    </p>
                    <span className="text-[10px] text-stone-400 block mt-1">
                      For purchase orders, tenders & RFQs
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">Business Hours</h3>
                    <p className="text-stone-600 mt-0.5">
                      Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                      Saturday: 10:00 AM - 3:00 PM IST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Assurance Card */}
            <div className="p-6 rounded-3xl bg-stone-900 text-stone-200 space-y-3">
              <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Export Guarantee</span>
              </div>
              <h4 className="font-serif font-bold text-lg text-white">
                Global Commercial Procurement
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                We accept letters of credit (L/C), international telegraphic transfers (T/T), and credit card payments via Razorpay. Quotations can be issued on Ex-Factory, FOB Mundra/Nhava Sheva, or CIF destination terms.
              </p>
            </div>
          </div>

          {/* Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-sm space-y-6">
              <div>
                <h2 className="font-serif font-black text-2xl text-stone-900">
                  Send us a Message or RFQ
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Fill in your details below for technical queries, bulk order discounts, or custom specifications.
                </p>
              </div>

              {status && (
                <div
                  className={`p-4 rounded-2xl flex items-start gap-3 text-xs ${
                    status.success
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {status.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 mb-1 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
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
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 mb-1 block">
                      Phone / Mobile Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 XXXXX XXXXX"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 mb-1 block">
                      Organization / Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">
                    Inquiry Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Bulk Welding Apron Quotation / Custom Leather Straps"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 mb-1 block">
                    Message / Specifications *
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details on required quantity, dimensions, certifications, delivery timeline..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 font-bold text-sm shadow-lg shadow-brand-500/25"
                >
                  <Send className="w-4 h-4 mr-2" />
                  <span>Send Inquiry</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading contact page...</div>}>
      <ContactContent />
    </Suspense>
  );
}
