'use client';

import React from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustMarquee } from '@/components/home/TrustMarquee';
import { FeaturedCategories } from '@/components/home/FeaturedCategories';
import { HeritageSection } from '@/components/home/HeritageSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { BulkInquiryCta } from '@/components/home/BulkInquiryCta';
import { ProductCard } from '@/components/products/ProductCard';
import { products } from '@/data/products';
import { ArrowRight, Flame } from 'lucide-react';

export default function HomePage() {
  const bestsellers = products.filter((p) => p.isBestseller || p.isFeatured).slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Industrial Trust Banner */}
      <TrustMarquee />

      {/* Featured Categories */}
      <FeaturedCategories />

      {/* Bestselling Industrial Products Section */}
      <section className="py-20 bg-stone-50 border-t border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider mb-2 border border-brand-200">
                <Flame className="w-3.5 h-3.5" />
                <span>Most Requested Safety Gear</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-stone-900 tracking-tight">
                Featured Bestsellers
              </h2>
            </div>
            <Link
              href="/products"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 hover:underline"
            >
              <span>Explore All 35+ Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-stone-900 hover:bg-brand-600 text-white font-bold text-sm shadow-md hover:shadow-brand-500/20 transition-all hover:-translate-y-0.5"
            >
              <span>View Full Products Catalog (USD)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Heritage & 20 Years Story */}
      <HeritageSection />

      {/* 4 Pillars of Excellence */}
      <WhyChooseUs />

      {/* B2B RFQ & Container Load Banner */}
      <BulkInquiryCta />
    </div>
  );
}
