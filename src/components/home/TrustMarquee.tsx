'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Truck, 
  Zap, 
  CheckCircle2, 
  Flame, 
  DollarSign 
} from 'lucide-react';

export const TrustMarquee = () => {
  const trustItems = [
    { icon: Award, label: 'ISO 9001:2015 Certified' },
    { icon: ShieldCheck, label: 'CE Marked Personal Protective Equipment' },
    { icon: Flame, label: 'EN 407 Thermal & Flame Hazard Compliance' },
    { icon: Zap, label: 'EN 388 High Cut & Tear Protection' },
    { icon: DollarSign, label: 'Export Orders in US Dollars ($)' },
    { icon: Truck, label: 'Direct Shipping from Kanpur Tannery Hub' },
    { icon: CheckCircle2, label: '100% Genuine Grain & Split Leather' },
  ];

  return (
    <div className="bg-stone-900 border-y border-stone-800 py-4 overflow-hidden relative select-none">
      <div className="flex gap-8 whitespace-nowrap animate-[marquee_25s_linear_infinite]">
        {[...trustItems, ...trustItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 text-stone-300 text-xs font-semibold tracking-wider uppercase"
            >
              <Icon className="w-4 h-4 text-brand-500" />
              <span>{item.label}</span>
              <span className="text-stone-700 ml-4">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
