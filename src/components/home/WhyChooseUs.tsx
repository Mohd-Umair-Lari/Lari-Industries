'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Settings, 
  Target, 
  Handshake, 
  CheckCircle2 
} from 'lucide-react';

export const WhyChooseUs = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Premium Quality',
      description:
        'All safety products meet international PPE standards (EN 388, EN 407, ISO 9001) and undergo rigorous testing before shipment.',
      highlight: 'Certified Standards',
    },
    {
      icon: Settings,
      title: 'Expert Craftsmanship',
      description:
        'Over two decades of precision leather cutting, Kevlar bonding, and specialized master tanning based in Kanpur.',
      highlight: '20+ Years Legacy',
    },
    {
      icon: Target,
      title: 'Custom Solutions',
      description:
        'Custom lengths, widths, gauges, and OEM branding for leather straps, sheets, and industrial fabrication needs.',
      highlight: 'As Per Custom Choice',
    },
    {
      icon: Handshake,
      title: 'Reliable Global Support',
      description:
        'Dedicated international sales support, transparent USD export quotes, and container-load logistics assistance.',
      highlight: 'Worldwide Shipping',
    },
  ];

  return (
    <section className="py-20 bg-stone-50 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
            Why Partner With Us
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-stone-900 tracking-tight">
            The Lari Industries Advantage
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-4">
            Protecting industrial workers across the globe with uncompromising safety standards and genuine Kanpur craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div
                key={i}
                className="rounded-3xl p-8 bg-white border border-stone-200/80 shadow-glass hover:shadow-glass-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-100 text-brand-600 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider block mb-1">
                    {benefit.highlight}
                  </span>
                  <h3 className="font-serif font-bold text-xl text-stone-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Guaranteed Assurance</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
