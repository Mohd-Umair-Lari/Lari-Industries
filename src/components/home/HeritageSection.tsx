'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Flame, 
  ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const HeritageSection = () => {
  return (
    <section className="py-20 md:py-28 bg-stone-900 text-stone-100 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Story */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-950/80 border border-brand-800/80 text-brand-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Established 2005 • Kanpur, India</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white leading-tight">
              Two Decades of Industrial Excellence & Hand Protection
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Situated in Kanpur, the historic leather hub of India, <strong className="text-white font-semibold">Lari Industries</strong> has devoted over 20 years to developing life-saving protective articles for personnel protection.
            </p>

            <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
              From high-heat smelting foundries to international construction sites, our mission is anchored in three non-negotiable pillars: <strong>Quality, Innovation, and Workplace Safety</strong>. Every welding apron, Kevlar gauntlet, and tarpaulin reflects painstaking tannery expertise, Kevlar heat-bonding, and rigorous stress testing.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/80">
                <ShieldCheck className="w-6 h-6 text-brand-500 mb-2" />
                <h4 className="font-serif font-bold text-white text-base">Zero-Defect Quality</h4>
                <p className="text-xs text-stone-400 mt-1">Multi-stage inspection on leather tensile gauge and flame thresholds.</p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/80">
                <Flame className="w-6 h-6 text-amberGold-400 mb-2" />
                <h4 className="font-serif font-bold text-white text-base">Thermal Defense</h4>
                <p className="text-xs text-stone-400 mt-1">DuPont™ Kevlar and asbestos composites tested up to 500°C.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link href="/about">
                <Button size="lg" className="bg-brand-500 hover:bg-brand-600 text-white font-bold">
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link 
                href="/static/docs/lari_industries_certificate.pdf" 
                target="_blank"
              >
                <Button size="lg" variant="outline" className="border-stone-700 text-stone-200 hover:border-brand-500 hover:text-white">
                  <FileText className="w-4 h-4 mr-2 text-brand-400" />
                  <span>View Certificate PDF</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-stone-700 shadow-2xl bg-stone-800">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/static/images/4-cat.jpg"
                  alt="Lari Industries Factory & Workmanship"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              </div>

              <div className="p-6 md:p-8 bg-stone-900/90 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                    Heritage Quality Standard
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                    ISO 9001:2015
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xl text-white mb-2">
                  Kanpur Master Tanning Craftsmanship
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Every batch of split cowhide and chrome-tanned leather is selected for tight grain fiber orientation to guard against punctures, molten slags, and mechanical friction.
                </p>
              </div>
            </div>

            {/* Floating Quality Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white text-stone-900 p-4 rounded-2xl shadow-2xl border border-stone-200 max-w-xs hidden sm:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-sm">International Export</p>
                  <p className="text-[11px] text-stone-500">Shipping across Europe, Americas, & Asia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
