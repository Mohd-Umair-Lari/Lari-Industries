'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, ArrowRight, Award, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NewsPage() {
  const newsItems = [
    {
      label: 'MILESTONE',
      title: '20+ Years of Manufacturing Excellence (2005 - 2026)',
      date: 'Established 2005',
      image: '/static/images/4-cat.jpg',
      pdfLink: '/static/docs/lari_industries_certificate.pdf',
      body: 'Since our establishment in 2005, Lari Industries has been at the forefront of industrial safety equipment manufacturing. Over two decades, we have served thousands of industrial plants across manufacturing, construction, and chemical sectors worldwide. Our ISO-certified facilities in Kanpur ensure every product complies with international PPE standards.',
    },
    {
      label: 'EXPANSION',
      title: 'Global Export Catalog Now Live in US Dollars ($)',
      date: 'May 2026',
      image: '/static/images/5-cat_orig.jpg',
      body: 'To better support international procurement officers, fabrication workshops, and overseas importers, our entire product catalog is now formatted in US Dollars ($). Customers can order directly through our secure Razorpay gateway with international credit cards or request custom B2B container load quotations.',
    },
    {
      label: 'INNOVATION',
      title: 'Advanced DuPont™ Kevlar® & Extreme Heat Research',
      date: 'Ongoing Initiative',
      image: '/static/images/Kevlar Gloves/IMG-20230807-WA0009.jpg',
      body: 'Our engineering team continues to innovate on high-temperature and extreme cut-resistant safety equipment. By combining virgin DuPont™ Kevlar® para-aramid yarn with our signature Kanpur chrome-tanned leather, we are delivering heat defense up to 500°C for foundry furnace tenders and glass manufacturers.',
    },
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Company Announcements</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-black text-stone-900 tracking-tight">
            Latest News & Updates
          </h1>
          <p className="text-stone-600 text-sm sm:text-base">
            Stay updated with our latest industrial safety developments, export initiatives, and factory milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full bg-stone-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-brand-500 text-white text-[10px] font-black tracking-wider uppercase">
                    {item.label}
                  </span>
                </div>

                <div className="p-6 md:p-8 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-stone-400 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-stone-900 hover:text-brand-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-8 pt-0">
                {item.pdfLink ? (
                  <Link
                    href={item.pdfLink}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700 underline"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Official Certificate (PDF)</span>
                  </Link>
                ) : (
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline"
                  >
                    <span>Explore Products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
