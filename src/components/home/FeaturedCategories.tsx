'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const CATEGORY_ITEMS = [
  {
    title: 'Welding & Work Aprons',
    category: 'Aprons',
    priceInfo: 'From $2.50 / piece',
    count: '8 Products',
    image: '/static/images/Aprons/Leather Welding Apron.jpeg',
    description: 'Split leather, dangri coveralls, and cotton lab coats.',
  },
  {
    title: 'Export Gloves',
    category: 'Export Gloves',
    priceInfo: 'From $1.25 / pair',
    count: '6 Products',
    image: '/static/images/Export gloves images/Drill Canadian.jpg',
    description: 'Canadian drill, drivers, split leather, and lined gloves.',
  },
  {
    title: 'Kevlar® Para-Aramid',
    category: 'Kevlar Gloves',
    priceInfo: 'From $12.50 / pair',
    count: '4 Products',
    image: '/static/images/Kevlar Gloves/IMG-20230807-WA0009.jpg',
    description: 'Extreme cut resistance, high heat protection up to 500°C.',
  },
  {
    title: 'Industrial Safety',
    category: 'Industrial Safety',
    priceInfo: 'From $0.25 / pair',
    count: '12 Products',
    image: '/static/images/Gloves Images/welder gloves 1.jpg',
    description: 'Welder gauntlets, cut resistance, PVC dotted, & utility gloves.',
  },
  {
    title: 'Harness Leather',
    category: 'Harness Leather',
    priceInfo: '$25.00 / kg',
    count: '3 Products',
    image: '/static/images/Harness leather thick/6 mm Thick leather 1.jpg',
    description: '6mm solid vegetable-tanned heavy industrial leather sheets.',
  },
  {
    title: 'Leather Sheets',
    category: 'Leather Sheets',
    priceInfo: '$18.00 / kg',
    count: '4 Products',
    image: '/static/images/LEATHER/Brown Leather.jpg',
    description: 'Full-grain brown & black buffalo and cowhide hides.',
  },
  {
    title: 'Leather Washers',
    category: 'Leather Washers',
    priceInfo: 'From $0.20 / piece',
    count: '5 Products',
    image: '/static/images/Leather Washer/Leather washer 1 a.jpg',
    description: 'Precision hydraulic foot valve and spud union sealing washers.',
  },
  {
    title: 'Waterproof Tarpaulins',
    category: 'Tarpaulin',
    priceInfo: 'From $40.00 / sheet',
    count: '3 Products',
    image: '/static/images/Tarpoline/Tarpoline image 01.jpg',
    description: 'Ultra-tough HDPE laminated monsoon and cargo tarpaulin covers.',
  },
];

export const FeaturedCategories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
              Our Specializations
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-stone-900 tracking-tight">
              Industrial Product Categories
            </h2>
          </div>
          <Link
            href="/products"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 hover:underline"
          >
            <span>View All Products in USD</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {CATEGORY_ITEMS.map((item) => (
            <Link
              key={item.category}
              href={`/products?category=${encodeURIComponent(item.category)}`}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 border border-stone-200/80 hover:border-brand-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-4 text-[10px] sm:text-xs font-bold text-white/90 bg-stone-900/60 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-white/20">
                  {item.priceInfo}
                </span>
              </div>

              <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="font-serif font-bold text-sm sm:text-lg text-stone-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="hidden sm:block text-xs text-stone-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-stone-100 flex items-center justify-between text-[10px] sm:text-xs font-bold text-stone-700 group-hover:text-brand-600">
                  <span>{item.count}</span>
                  <span className="inline-flex items-center gap-1">
                    Shop <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
