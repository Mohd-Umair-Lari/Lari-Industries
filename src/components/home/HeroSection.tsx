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
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-brand-200/30 via-rose-100/20 to-amber-100/25 blur-3xl -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-brand-500/5 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-sm text-[11px] sm:text-xs font-bold text-stone-700 tracking-wider">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span>ESTD. 2005 • KANPUR, INDIA</span>
            <span className="hidden sm:inline text-stone-300">|</span>
            <span className="text-brand-600 flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5" /> Worldwide Export in USD ($)
            </span>
          </div>

          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-serif font-black tracking-tight text-stone-950 uppercase">
            LARI INDUSTRIES
          </h1>

          <div className="relative inline-block">
            <h2 className="text-xl sm:text-3xl md:text-5xl font-serif font-black tracking-wide text-brand-600 uppercase">
              &ldquo;THINK SAFETY BEFORE YOU START&rdquo;
            </h2>
            <div className="w-24 h-1 bg-brand-500 mx-auto mt-2 rounded-full shadow-sm" />
          </div>

          <p className="text-base sm:text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed pt-2">
            Since 2005, <strong className="text-stone-900 font-semibold">Lari Industries</strong> has engineered superior leather personal protective equipment (PPE). We equip worldwide heavy industries, welding fabricators, foundries, and workshops with certified leather safety gloves, industrial aprons, leg guards, and all-weather tarpaulins.
          </p>

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

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Welding & Safety Aprons */}
          <Link
            href="/products?category=Aprons"
            className="group relative rounded-3xl p-6 bg-white/90 backdrop-blur-xl border border-stone-200/90 shadow-glass hover:shadow-glass-hover hover:-translate-y-1.5 transition-all duration-300 text-center flex flex-col justify-between"
          >
            <div>
              <div className="relative w-44 h-44 mx-auto mb-4 rounded-2xl overflow-hidden bg-white border border-stone-100 shadow-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                <Image
                  src="/static/images/Aprons/Apron image 1.jpg"
                  alt="Leather Welding & Safety Aprons"
                  fill
                  className="object-contain p-3"
                />
              </div>
              <h4 className="font-serif font-bold text-xl text-stone-900 group-hover:text-brand-600 transition-colors">
                Welding & Safety Aprons
              </h4>
              <p className="text-xs text-stone-500 mt-1.5 line-clamp-2">
                Heavy split leather welding aprons & heat-resistant protective suits
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 inline-flex items-center justify-center text-xs font-bold text-brand-600 group-hover:text-brand-700">
              <span>From $2.50 / piece</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 2: Raw Hides & Parchment */}
          <Link
            href="/products?category=Raw%20Hides"
            className="group relative rounded-3xl p-6 bg-white/90 backdrop-blur-xl border border-stone-200/90 shadow-glass hover:shadow-glass-hover hover:-translate-y-1.5 transition-all duration-300 text-center flex flex-col justify-between"
          >
            <div>
              <div className="relative w-44 h-44 mx-auto mb-4 rounded-2xl overflow-hidden bg-white border border-stone-100 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/static/images/rawhides/parchment-sheet-1.jpeg"
                  alt="Bleached Raw Hides & Parchment"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="font-serif font-bold text-xl text-stone-900 group-hover:text-brand-600 transition-colors">
                Raw Hides & Parchment
              </h4>
              <p className="text-xs text-stone-500 mt-1.5 line-clamp-2">
                Direct Kanpur tannery: bleached goat & buff calfskin (0.7–1.0mm, 6+ sq.ft)
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 inline-flex items-center justify-center text-xs font-bold text-brand-600 group-hover:text-brand-700">
              <span>From $16.50 / hide</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 3: Safety Gloves Series */}
          <Link
            href="/products?category=Export%20Gloves"
            className="group relative rounded-3xl p-6 bg-white/90 backdrop-blur-xl border border-stone-200/90 shadow-glass hover:shadow-glass-hover hover:-translate-y-1.5 transition-all duration-300 text-center flex flex-col justify-between"
          >
            <div>
              <div className="relative w-44 h-44 mx-auto mb-4 rounded-2xl overflow-hidden bg-white border border-stone-100 shadow-sm group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                <Image
                  src="/static/images/Gloves Images/branded gloves 4.jpeg"
                  alt="Lari CE Certified Safety Gloves"
                  fill
                  className="object-contain p-3"
                />
              </div>
              <h4 className="font-serif font-bold text-xl text-stone-900 group-hover:text-brand-600 transition-colors">
                Safety Gloves Series
              </h4>
              <p className="text-xs text-stone-500 mt-1.5 line-clamp-2">
                Certified EN388:2016 split leather, Kevlar cut-resistant & driver gloves
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-100 inline-flex items-center justify-center text-xs font-bold text-brand-600 group-hover:text-brand-700">
              <span>From $0.25 / pair</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};
