'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  Globe2, 
  Sparkles,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const HeroSection = () => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-50">
      {/* Decorative background blurs and morphic light circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-brand-200/30 via-rose-100/20 to-amber-100/25 blur-3xl -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-brand-500/5 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Estd Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-sm text-xs font-bold text-stone-700 tracking-wider">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span>ESTD. 2005 • KANPUR, INDIA</span>
            <span className="text-stone-300">|</span>
            <span className="text-brand-600 flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5" /> Worldwide Export in USD ($)
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-black tracking-tight text-stone-950 uppercase">
            LARI INDUSTRIES
          </h1>

          {/* Iconic Tagline */}
          <div className="relative inline-block">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-wide text-brand-600 uppercase">
              &ldquo;THINK SAFETY BEFORE YOU START&rdquo;
            </h2>
            <div className="w-24 h-1 bg-brand-500 mx-auto mt-2 rounded-full shadow-sm" />
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed pt-2">
            Since 2005, <strong className="text-stone-900 font-semibold">Lari Industries</strong> has engineered superior leather personal protective equipment (PPE). We equip worldwide heavy industries, welding fabricators, foundries, and workshops with certified leather safety gloves, industrial aprons, leg guards, and all-weather tarpaulins.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/products">
              <Button size="lg" className="px-8 py-4 text-base shadow-xl shadow-brand-500/25">
                <span>Explore Products (USD)</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="px-8 py-4 text-base border-stone-300">
                <PhoneCall className="w-4 h-4 mr-2 text-brand-600" />
                <span>Request B2B Quote</span>
              </Button>
            </Link>
          </div>

          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-stone-200/80 shadow-sm text-center">
              <p className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">20+</p>
              <p className="text-xs text-stone-500 font-medium">Years of Excellence</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-stone-200/80 shadow-sm text-center">
              <p className="text-2xl sm:text-3xl font-black text-brand-600 font-serif">1,000+</p>
              <p className="text-xs text-stone-500 font-medium">Industries Protected</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-stone-200/80 shadow-sm text-center">
              <p className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">100%</p>
              <p className="text-xs text-stone-500 font-medium">Certified Quality</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-stone-200/80 shadow-sm text-center">
              <p className="text-2xl sm:text-3xl font-black text-emerald-600 font-serif">USD ($)</p>
              <p className="text-xs text-stone-500 font-medium">Direct Global Pricing</p>
            </div>
          </div>
        </div>

        {/* 3 Featured Signature Product Cards from original index.html */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Safety Shoes */}
          <Link
            href="/products?category=Industrial%20Safety"
            className="group relative rounded-3xl p-6 bg-white/80 backdrop-blur-xl border border-stone-200/80 shadow-glass hover:shadow-glass-hover hover:-translate-y-2 transition-all duration-300 text-center"
          >
            <div className="relative w-44 h-44 mx-auto mb-4 rounded-2xl overflow-hidden bg-stone-100 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/static/images/8-cat.jpg"
                alt="Safety Shoes & Footwear"
                fill
                className="object-cover"
              />
            </div>
            <h4 className="font-serif font-bold text-xl text-stone-900 group-hover:text-brand-600 transition-colors">
              Safety Footwear & Spats
            </h4>
            <p className="text-xs text-stone-500 mt-1">
              Steel toe, oil-resistant leather spats & protective footwear
            </p>
            <div className="mt-3 inline-flex items-center text-xs font-bold text-brand-600 group-hover:underline">
              <span>View Collection</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          {/* Card 2: SLS-103 Welding Aprons */}
          <Link
            href="/products?category=Aprons"
            className="group relative rounded-3xl p-6 bg-gradient-to-br from-white via-rose-50/30 to-amber-50/20 backdrop-blur-xl border border-brand-200/60 shadow-glass-hover hover:-translate-y-2 transition-all duration-300 text-center ring-2 ring-brand-500/20"
          >
            <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-brand-500 text-white text-[10px] font-bold uppercase tracking-wider">
              Bestseller
            </span>
            <div className="relative w-44 h-44 mx-auto mb-4 rounded-2xl overflow-hidden bg-stone-100 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/static/images/5-cat_orig.jpg"
                alt="SLS-103 Welding Gear"
                fill
                className="object-cover"
              />
            </div>
            <h4 className="font-serif font-bold text-xl text-stone-900 group-hover:text-brand-600 transition-colors">
              SLS - 103 Welding Gear
            </h4>
            <p className="text-xs text-stone-500 mt-1">
              Heavy split leather welding aprons & heat-resistant suits
            </p>
            <div className="mt-3 inline-flex items-center text-xs font-bold text-brand-600 group-hover:underline">
              <span>From $6.00 / piece</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          {/* Card 3: Safety Gloves */}
          <Link
            href="/products?category=Export%20Gloves"
            className="group relative rounded-3xl p-6 bg-white/80 backdrop-blur-xl border border-stone-200/80 shadow-glass hover:shadow-glass-hover hover:-translate-y-2 transition-all duration-300 text-center"
          >
            <div className="relative w-44 h-44 mx-auto mb-4 rounded-2xl overflow-hidden bg-stone-100 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/static/images/1-cat.jpg"
                alt="Safety Gloves"
                fill
                className="object-cover"
              />
            </div>
            <h4 className="font-serif font-bold text-xl text-stone-900 group-hover:text-brand-600 transition-colors">
              Safety Gloves Series
            </h4>
            <p className="text-xs text-stone-500 mt-1">
              Canadian drill, Kevlar cut-resistant, driver & welder gauntlets
            </p>
            <div className="mt-3 inline-flex items-center text-xs font-bold text-brand-600 group-hover:underline">
              <span>From $0.25 / pair</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
