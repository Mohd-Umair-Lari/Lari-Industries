'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  SlidersHorizontal, 
  LayoutGrid, 
  List, 
  X, 
  ShieldCheck, 
  ArrowUpDown,
  Filter
} from 'lucide-react';
import { products, CATEGORIES } from '@/data/products';
import { ProductCategory, Product } from '@/types/product';
import { ProductCard } from '@/components/products/ProductCard';
import { formatUSD } from '@/lib/utils';
import { Suspense } from 'react';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as ProductCategory | null;
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    initialCategory && CATEGORIES.includes(initialCategory) ? initialCategory : 'All'
  );
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const cat = searchParams.get('category') as ProductCategory | null;
    if (cat && CATEGORIES.includes(cat)) {
      setSelectedCategory(cat);
    }
    const q = searchParams.get('search');
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by Category
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.specs.material.toLowerCase().includes(q) ||
          p.specs.application.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        list.sort((a, b) => {
          if (a.isBestseller && !b.isBestseller) return -1;
          if (!a.isBestseller && b.isBestseller) return 1;
          return 0;
        });
        break;
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="bg-stone-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Banner */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Official Factory Catalog • All Prices in US Dollars ($)</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-black text-stone-900 tracking-tight">
            Our Products
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            We manufacture a diverse range of leather articles and personal protective equipment. Our specialization includes welder gloves and gauntlets, industrial safety aprons, Kevlar® para-aramid gear, and heavy tarpaulins.
          </p>
        </div>

        {/* Search & Sort Controls Toolbar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-stone-200/80 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search products, materials, welding, Kevlar, sizes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm text-stone-900 placeholder:text-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3.5 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sorting & Layout Toggles */}
            <div className="flex items-center gap-3">
              <div className="relative flex items-center">
                <ArrowUpDown className="absolute left-3 w-4 h-4 text-stone-400 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="pl-9 pr-8 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer appearance-none"
                >
                  <option value="featured">Featured / Bestsellers</option>
                  <option value="price-asc">Price: Low to High ($)</option>
                  <option value="price-desc">Price: High to Low ($)</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="name">Product Name (A - Z)</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-brand-600 shadow-sm' : 'text-stone-500 hover:text-stone-900'
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white text-brand-600 shadow-sm' : 'text-stone-500 hover:text-stone-900'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills (Horizontal Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 no-scrollbar">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider flex items-center gap-1 flex-shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25 scale-105'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count & Clear Active Filters */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-6 px-1">
          <p>
            Showing <strong className="text-stone-900">{filteredProducts.length}</strong> products
            {selectedCategory !== 'All' && <span> in <strong className="text-brand-600">{selectedCategory}</strong></span>}
            {searchQuery && <span> matching &ldquo;{searchQuery}&rdquo;</span>}
          </p>

          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-brand-600 hover:underline font-bold flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" /> Clear filters
            </button>
          )}
        </div>

        {/* Products Grid / List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-stone-200/80 p-8">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-900">
              No products found
            </h3>
            <p className="text-stone-500 text-sm mt-1 max-w-md mx-auto">
              We couldn&apos;t find any safety equipment matching your filters. Try selecting another category or clear your search query.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-6 px-6 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-xs shadow-md hover:bg-brand-600 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-center py-24 text-stone-500">Loading catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
