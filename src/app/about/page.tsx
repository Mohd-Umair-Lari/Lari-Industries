'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  Factory, 
  Users, 
  Globe 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="bg-stone-50 min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Banner */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>ESTD: 2005 • KANPUR, INDIA</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-black text-stone-900 tracking-tight">
            About Lari Industries
          </h1>
          <p className="text-lg sm:text-xl font-serif text-brand-600 font-bold">
            &ldquo;THINK SAFETY BEFORE YOU START&rdquo;
          </p>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto pt-2">
            <strong className="text-stone-900 font-semibold">Lari Industries</strong> stands as a beacon of excellence in the safety equipment and industrial leather manufacturing industry. Since our establishment in 2005, we have been dedicated to protecting workers across diverse sectors worldwide.
          </p>
        </div>

        {/* 3 Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm text-center">
            <span className="text-4xl sm:text-5xl font-black text-brand-600 font-serif block mb-1">
              20+
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-700">
              Years of Excellence
            </span>
            <p className="text-xs text-stone-500 mt-2">Continuous manufacturing legacy since 2005.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm text-center">
            <span className="text-4xl sm:text-5xl font-black text-stone-900 font-serif block mb-1">
              1,000+
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-700">
              Industries Served
            </span>
            <p className="text-xs text-stone-500 mt-2">Fabrication, foundries, construction, & mining.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm text-center">
            <span className="text-4xl sm:text-5xl font-black text-emerald-600 font-serif block mb-1">
              100%
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-stone-700">
              Quality Assurance
            </span>
            <p className="text-xs text-stone-500 mt-2">Certified to EN 388, EN 407 & ISO 9001 standards.</p>
          </div>
        </div>

        {/* Two-Column Story & Craftsmanship */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-stone-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-stone-900 leading-tight">
              Our Journey in the Leather Capital of India
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              For over two decades, Lari Industries has produced specialized leather safety articles for personnel protection. Due to our company&apos;s unwavering focus on innovation and hands-on factory experience, we offer comprehensive industrial solutions for hand, torso, and foot protection.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              We specialize in producing highly technical products like leather industrial welding gloves, safety boots, flame-retardant welding aprons, industrial worker coveralls, Kevlar heat gloves, and tough tarpaulin covers.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Our manufacturing philosophy centers on three core pillars: <strong>Quality, Innovation, and Safety</strong>. When industrial workers trust us with their safety, we carry a responsibility that goes far beyond business — we carry the duty of safeguarding lives.
            </p>

            <div className="pt-2">
              <Link 
                href="/static/docs/lari_industries_certificate.pdf" 
                target="_blank"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-brand-600 text-white text-xs font-bold transition-all shadow-md"
              >
                <FileText className="w-4 h-4 text-brand-400" />
                <span>View Official Certificate PDF</span>
              </Link>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200 shadow-md">
            <Image
              src="/static/images/4-cat.jpg"
              alt="Lari Industries Factory & Workmanship"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Manufacturing Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-3">
            <Factory className="w-8 h-8 text-brand-600" />
            <h3 className="font-serif font-bold text-xl text-stone-900">Modern Infrastructure</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              State-of-the-art cutting, hydraulic press embossing, and Kevlar stitching facilities located in Chandra Nagar, Kanpur.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-3">
            <Users className="w-8 h-8 text-amberGold-600" />
            <h3 className="font-serif font-bold text-xl text-stone-900">Master Craftsmen</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Skilled artisans with generational tanning and leathercraft knowledge ensuring flawless seam strength and comfort.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-sm space-y-3">
            <Globe className="w-8 h-8 text-emerald-600" />
            <h3 className="font-serif font-bold text-xl text-stone-900">Worldwide Export</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Reliable container load and air cargo shipping globally with direct pricing in US Dollars ($).
            </p>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="bg-stone-900 rounded-3xl p-8 sm:p-14 text-white text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight">
            Schedule a Direct Consultation with Our Safety Engineers
          </h2>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto">
            Whether you require standard stock or custom manufactured leather aprons and gloves, our Kanpur headquarters is ready to assist.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link href="/contact">
              <Button size="lg" className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-8">
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-stone-700 text-white hover:border-brand-500">
                <span>Browse Products (USD)</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
