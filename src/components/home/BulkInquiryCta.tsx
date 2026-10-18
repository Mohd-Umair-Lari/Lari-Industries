'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneCall, Mail, ArrowRight, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const BulkInquiryCta = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 text-white p-8 sm:p-12 md:p-16 border border-stone-800 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/40 text-brand-400 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Bulk Purchasing & International Tenders</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white leading-tight">
              Looking for Bulk Export Orders or Custom Leather Specifications?
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              We supply container loads of welding aprons, asbestos/Kevlar gauntlets, and custom leather straps directly from our Kanpur manufacturing base. Contact our engineering team for discounted tier pricing in USD ($) and FOB/CIF freight quotations.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/contact">
                <Button size="lg" className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-3.5">
                  <span>Submit Inquiry / RFQ</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a
                href="mailto:Larindustries@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-stone-200 text-sm font-semibold border border-stone-700 transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-400" />
                <span>Larindustries@gmail.com</span>
              </a>
              <a
                href="tel:+919956675648"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-stone-200 text-sm font-semibold border border-stone-700 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-brand-400" />
                <span>+91 99566 75648</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
