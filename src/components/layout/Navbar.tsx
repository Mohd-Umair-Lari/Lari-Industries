'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/products';
import { formatUSD } from '@/lib/utils';

export const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { totalItems, openCart } = useCart();
  const { totalWishlistItems } = useWishlist();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '/' },
    { label: 'PRODUCTS', href: '/products' },
    { label: 'ABOUT', href: '/about' },
    { label: 'NEWS', href: '/news' },
    { label: 'CONTACT', href: '/contact' },
  ];

  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  return (
    <>
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-brand-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              THINK SAFETY BEFORE YOU START
            </span>
            <span className="hidden md:inline-block text-stone-500">|</span>
            <span className="hidden md:inline-block text-stone-400">
              Kanpur Certified Safety Manufacturers • Estd. 2005
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              All Prices in USD ($)
            </span>
            <a
              href="tel:+919956675648"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-brand-400" />
              <span className="hidden sm:inline">+91 99566 75648</span>
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-md border-b border-stone-200/80 py-3'
            : 'bg-white/80 backdrop-blur-lg border-b border-stone-200/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-stone-200 shadow-sm group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/static/images/logo.jpg"
                  alt="Lari Industries Logo"
                  fill
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-stone-900 group-hover:text-brand-600 transition-colors">
                  LARI INDUSTRIES
                </span>
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-stone-500">
                  ESTD. 2005 • KANPUR
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-xs tracking-[0.15em] font-bold transition-colors py-1 ${
                      isActive
                        ? 'text-brand-600'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search products"
                className="p-2.5 rounded-full hover:bg-stone-100 text-stone-700 hover:text-brand-600 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative p-2.5 rounded-full hover:bg-stone-100 text-stone-700 hover:text-rose-600 transition-colors"
              >
                <Heart className="w-5 h-5" />
                {totalWishlistItems > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {totalWishlistItems}
                  </span>
                )}
              </Link>

              <button
                onClick={openCart}
                aria-label="Open shopping cart"
                className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-stone-900 hover:bg-brand-600 text-white shadow-md hover:shadow-brand-500/20 transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">
                  Cart
                </span>
                <span className="w-5 h-5 rounded-full bg-brand-500 text-white text-xs font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              </button>

              {status === 'loading' ? (
                <div className="w-10 h-10 rounded-full bg-stone-200 animate-pulse" />
              ) : session?.user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-stone-100 transition-colors"
                    aria-label="User menu"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                      {session.user.image ? (
                        <Image src={session.user.image} alt="" className="w-8 h-8 rounded-full" />
                      ) : (
                        <User className="w-5 h-5 text-brand-600" />
                      )}
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-stone-700">
                      {session.user.name || session.user.email}
                    </span>
                    <ChevronDown className="w-4 h-4 text-stone-500" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-stone-200 py-2 z-50 animate-in fade-in zoom-in-95">
                      <Link
                        href="/account"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        My Account
                      </Link>
                      <Link
                        href="/orders"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <ShieldCheck className="w-4 h-4" />
                        My Orders
                      </Link>
                      <hr className="my-2 border-stone-200" />
                      <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/auth/signin"
                    className="hidden sm:block px-3 py-2 text-xs font-bold text-stone-700 hover:text-brand-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-3 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                className="lg:hidden p-2.5 rounded-xl hover:bg-stone-100 text-stone-800"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-stone-200 shadow-xl p-4 transition-all">
            <div className="max-w-3xl mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search leather gloves, welding aprons, asbestos, Kevlar, tarpaulins..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-stone-100/80 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-stone-900 text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {searchResults.length > 0 && (
                <div className="mt-3 divide-y divide-stone-100 bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden">
                  {searchResults.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-4 p-3 hover:bg-stone-50 transition-colors"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-stone-900 truncate">
                          {p.name}
                        </p>
                        <p className="text-xs text-stone-500">{p.category}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-brand-600">
                          {p.isCustomQuote ? 'Custom Quote' : formatUSD(p.price, p.priceUnit)}
                        </span>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href={`/products?search=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setSearchOpen(false)}
                    className="block text-center py-2.5 text-xs font-bold text-brand-600 hover:bg-brand-50 transition-colors"
                  >
                    View all matching products <ArrowRight className="inline w-3 h-3 ml-1" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {mobileMenuOpen && (
                  <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-stone-200 px-6 py-6 space-y-4 shadow-xl">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block text-base font-bold py-2 tracking-wider ${
                          pathname === link.href ? 'text-brand-600' : 'text-stone-800'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                    {session?.user ? (
                      <div className="pt-4 border-t border-stone-100 space-y-2">
                        <Link
                          href="/account"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 text-sm font-semibold text-stone-700 py-2"
                        >
                          <User className="w-4 h-4" />
                          My Account
                        </Link>
                        <Link
                          href="/orders"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2 text-sm font-semibold text-stone-700 py-2"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          My Orders
                        </Link>
                        <button
                          onClick={() => signOut({ callbackUrl: '/' })}
                          className="flex items-center gap-2 w-full text-left text-sm font-semibold text-red-600 py-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <div className="pt-4 border-t border-stone-100 flex flex-col gap-2">
                        <Link
                          href="/wishlist"
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between text-sm font-semibold text-stone-700 py-2"
                        >
                          <span>My Wishlist</span>
                          <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center">
                            {totalWishlistItems}
                          </span>
                        </Link>
                        <div className="py-2 text-xs text-stone-500">
                          Call Us: <a href="tel:+919****5648" className="text-stone-900 font-bold">+91 99566 75648</a>
                        </div>
                        <div className="flex flex-col gap-2 pt-2">
                          <Link
                            href="/auth/signin"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 font-semibold text-center"
                          >
                            Sign In
                          </Link>
                          <Link
                            href="/auth/signup"
                            onClick={() => setMobileMenuOpen(false)}
                            className="px-4 py-2 rounded-xl bg-brand-500 text-white font-semibold text-center"
                          >
                            Get Started
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </header>
            </>
          );
        };
