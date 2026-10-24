'use client';

import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustMarquee } from '@/components/home/TrustMarquee';
import { ExclusiveRawHidesSection } from '@/components/home/ExclusiveRawHidesSection';
import { FeaturedCategories } from '@/components/home/FeaturedCategories';
import { HeritageSection } from '@/components/home/HeritageSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { BulkInquiryCta } from '@/components/home/BulkInquiryCta';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <TrustMarquee />

      <ExclusiveRawHidesSection />

      <FeaturedCategories />

      <HeritageSection />

      <WhyChooseUs />

      <BulkInquiryCta />
    </div>
  );
}
