'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  ShoppingBag, 
  Grid, 
  Heart, 
  PhoneCall 
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export const MobileBottomNav = () => {
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const { totalWishlistItems } = useWishlist();

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'Shop',
      href: '/products',
      icon: Grid,
      isActive: pathname.startsWith('/products'),
    },
    {
      label: 'Wishlist',
      href: '/wishlist',
      icon: Heart,
      isActive: pathname === '/wishlist',
      badge: totalWishlistItems > 0 ? totalWishlistItems : null,
    },
    {
      label: 'Contact',
      href: '/contact',
      icon: PhoneCall,
      isActive: pathname === '/contact',
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {navItems.slice(0, 2).map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center h-full transition-colors select-none ${
                item.isActive ? 'text-brand-600 font-bold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Icon className="w-5 h-5 mb-1 stroke-[2.2]" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}

        {/* Center Prominent Cart Button for One-Thumb Ergonomics */}
        <button
          onClick={openCart}
          aria-label={`Open shopping cart with ${totalItems} items`}
          className="relative flex flex-col items-center justify-center -top-3.5 group select-none"
        >
          <div className="w-13 h-13 p-3.5 rounded-full bg-brand-500 text-white shadow-lg shadow-brand-500/35 group-active:scale-95 transition-transform flex items-center justify-center">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] font-black flex items-center justify-center border-2 border-white animate-pulse">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold text-stone-800 tracking-tight mt-1">
            Cart
          </span>
        </button>

        {navItems.slice(2).map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center h-full transition-colors select-none ${
                item.isActive ? 'text-brand-600 font-bold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5 mb-1 stroke-[2.2]" />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
