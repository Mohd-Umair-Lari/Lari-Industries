import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#1c1917',
};

export const metadata: Metadata = {
  title: 'Lari Industries | Premium Industrial Safety Equipment & Leather Products',
  description:
    'Lari Industries (Estd 2005, Kanpur) is a premier manufacturer and exporter of leather safety articles, welder aprons, Kevlar gloves, and industrial protection in US Dollars.',
  keywords: [
    'leather safety gloves',
    'welding apron',
    'Kanpur leather manufacturers',
    'industrial safety equipment',
    'Kevlar heat gloves',
    'asbestos gloves',
    'tarpaulins',
    'Lari Industries'
  ],
  icons: {
    icon: '/static/images/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/static/images/logo.jpg" />
      </head>
      <body className="min-h-screen flex flex-col bg-stone-50 text-stone-900 antialiased selection:bg-brand-500 selection:text-white">
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <CartDrawer />
            <MobileBottomNav />
            <Footer />
          </WishlistProvider>
        </CartProvider>

        {/* Razorpay Official Checkout SDK */}
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
