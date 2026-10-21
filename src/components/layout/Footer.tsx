'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Award, 
  FileText,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '@/data/products';

export const Footer = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-28 lg:pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white p-1">
                <Image
                  src="/static/images/logo.jpg"
                  alt="Lari Industries"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-serif font-black text-white tracking-wider">
                  LARI INDUSTRIES
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-brand-400 font-bold">
                  Estd. 2005 • Kanpur, India
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Premier manufacturer and exporter of heavy-duty leather safety equipment, industrial welder gloves, protective aprons, heat-resistant Kevlar/asbestos gear, and high-performance tarpaulins.
            </p>

            <div className="pt-2 flex items-center gap-2 text-brand-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-brand-500" />
              <span>&ldquo;THINK SAFETY BEFORE YOU START&rdquo;</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-300 font-medium">
                <Award className="w-3.5 h-3.5 text-amberGold-400" /> ISO 9001:2015
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-900 border border-stone-800 text-xs text-stone-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-400" /> CE Certified
              </span>
              <Link 
                href="/static/docs/lari_industries_certificate.pdf" 
                target="_blank"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs text-stone-300 font-medium transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-brand-400" /> Certificate PDF
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Products
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              {CATEGORIES.filter(c => c !== 'All').slice(0, 6).map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    className="hover:text-brand-400 transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-brand-400 font-semibold text-xs inline-flex items-center gap-1 pt-1 hover:underline"
                >
                  View All Products <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link href="/" className="hover:text-brand-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-400 transition-colors">
                  About Us (20+ Years)
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-brand-400 transition-colors">
                  Latest News & Updates
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-400 transition-colors">
                  B2B Bulk Quote / RFQ
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-brand-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-brand-400 transition-colors">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Factory & Office
            </h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-500 mt-1 flex-shrink-0" />
                <span>
                  C-33 Chandra Nagar, Lal Bangla, Kanpur - 208007, Uttar Pradesh, India
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <a href="tel:+919956675648" className="hover:text-white transition-colors">
                  +91 99566 75648
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <a href="mailto:Larindustries@gmail.com" className="hover:text-white transition-colors">
                  Larindustries@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span>Mon - Sat: 9:00 AM - 6:00 PM IST</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p>© 2005 - 2026 Lari Industries Kanpur. All rights reserved.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span className="font-semibold text-stone-300">
              Secure Global Payments via Razorpay • USD ($)
            </span>
            <div className="flex gap-2">
              <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[10px]">VISA</span>
              <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[10px]">Mastercard</span>
              <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[10px]">UPI</span>
              <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800 text-[10px]">NetBanking</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
