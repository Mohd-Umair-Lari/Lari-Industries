'use client';

import React, { useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Truck, 
  ArrowRight, 
  Heart, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Award, 
  Share2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatUSD } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/products/ProductCard';

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const product = products.find((p) => p.slug === params.slug);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'applications' | 'shipping' | 'bulk'>('specs');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) {
    notFound();
  }

  const isFavorited = isInWishlist(product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-stone-900">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-stone-900">
            Products
          </Link>
          <span>/</span>
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="hover:text-stone-900"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-stone-900 font-bold truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Product Overview Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-stone-200/80 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Product Gallery View */}
            <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-inner group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <button
                  onClick={handleShare}
                  aria-label="Share product link"
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-700 shadow-md transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                {copiedLink && (
                  <span className="absolute top-16 right-4 px-2 py-1 bg-stone-900 text-white text-[10px] rounded shadow-md">
                    Link Copied!
                  </span>
                )}
              </div>

              {/* Quality & Trust Indicator Pill */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs font-semibold text-stone-600">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-brand-600" />
                  <span>ISO Certified</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex flex-col items-center gap-1">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Kanpur Leather</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Global Dispatch</span>
                </div>
              </div>
            </div>

            {/* Product Meta & Pricing */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 font-bold uppercase tracking-wider border border-brand-200">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-stone-900">{product.rating.toFixed(1)}</span>
                    <span className="text-stone-400">({product.reviewCount} verified reviews)</span>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-950 tracking-tight mb-4">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 mb-6 flex items-baseline justify-between">
                  {product.isCustomQuote ? (
                    <div>
                      <span className="text-2xl font-black text-brand-600">
                        As Per Custom Choice
                      </span>
                      <p className="text-xs text-stone-500 mt-1">
                        Dimensions, width, thickness & leather grade tailored to custom order.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-stone-900">
                          {formatUSD(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-base text-stone-400 line-through">
                            {formatUSD(product.originalPrice)}
                          </span>
                        )}
                        {product.priceUnit && (
                          <span className="text-sm font-semibold text-stone-600">
                            {product.priceUnit}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-emerald-700 font-medium mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> In Stock & Ready to Ship from Kanpur
                      </p>
                    </div>
                  )}

                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800">
                    USD ($)
                  </span>
                </div>

                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Key Features Bullet Points */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                    Engineered Highlights:
                  </h4>
                  <ul className="space-y-1.5">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-600">
                        <CheckCircle2 className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Purchase Box */}
              <div className="pt-6 border-t border-stone-200 space-y-4">
                {product.isCustomQuote ? (
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>
                        This leather item is crafted strictly to custom dimensional requirements. Submit your custom length, width, and thickness for an immediate quote.
                      </span>
                    </div>
                    <Link
                      href={`/contact?product=${encodeURIComponent(product.name)}`}
                      className="w-full flex items-center justify-center gap-2 py-4 px-8 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-xl shadow-brand-500/25 transition-all"
                    >
                      <span>Request Custom Choice Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-stone-700">Quantity:</span>
                      <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 shadow-sm">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-2.5 hover:bg-stone-200 text-stone-700 rounded-l-xl transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-5 text-sm font-bold text-stone-900">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-2.5 hover:bg-stone-200 text-stone-700 rounded-r-xl transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => toggleWishlist(product)}
                        className={`p-3 rounded-xl border transition-colors ${
                          isFavorited
                            ? 'border-rose-500 text-rose-500 bg-rose-50'
                            : 'border-stone-200 text-stone-500 hover:text-stone-900 bg-white'
                        }`}
                        aria-label="Wishlist"
                      >
                        <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <Button
                        onClick={handleAddToCart}
                        variant="secondary"
                        size="lg"
                        className="py-4 text-sm"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        <span>Add to Cart ({formatUSD(product.price * quantity)})</span>
                      </Button>

                      <Button
                        onClick={handleBuyNow}
                        variant="primary"
                        size="lg"
                        className="py-4 text-sm shadow-xl shadow-brand-500/25"
                      >
                        <span>Buy Now via Razorpay</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Specifications, Applications, Shipping, Bulk Quote */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-stone-200/80 mb-16">
          <div className="flex gap-4 border-b border-stone-200 pb-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2 text-sm font-bold whitespace-nowrap transition-colors relative ${
                activeTab === 'specs' ? 'text-brand-600' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Technical Specifications
              {activeTab === 'specs' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`pb-2 text-sm font-bold whitespace-nowrap transition-colors relative ${
                activeTab === 'applications' ? 'text-brand-600' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Industrial Applications
              {activeTab === 'applications' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-2 text-sm font-bold whitespace-nowrap transition-colors relative ${
                activeTab === 'shipping' ? 'text-brand-600' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Export Shipping & Delivery
              {activeTab === 'shipping' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('bulk')}
              className={`pb-2 text-sm font-bold whitespace-nowrap transition-colors relative ${
                activeTab === 'bulk' ? 'text-brand-600' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Bulk Orders & Customization
              {activeTab === 'bulk' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full" />
              )}
            </button>
          </div>

          <div className="pt-6">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-xs text-stone-500 block">Base Material:</span>
                  <span className="font-bold text-stone-900">{product.specs.material}</span>
                </div>
                {product.specs.thickness && (
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-xs text-stone-500 block">Thickness / Gauge:</span>
                    <span className="font-bold text-stone-900">{product.specs.thickness}</span>
                  </div>
                )}
                {product.specs.grade && (
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-xs text-stone-500 block">Quality Grade:</span>
                    <span className="font-bold text-stone-900">{product.specs.grade}</span>
                  </div>
                )}
                {product.specs.certification && (
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="text-xs text-stone-500 block">Certifications & Standards:</span>
                    <span className="font-bold text-stone-900">{product.specs.certification}</span>
                  </div>
                )}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-xs text-stone-500 block">Place of Origin:</span>
                  <span className="font-bold text-stone-900">{product.specs.origin}</span>
                </div>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-xs text-stone-500 block">Primary Application:</span>
                  <span className="font-bold text-stone-900">{product.specs.application}</span>
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="prose prose-stone text-sm space-y-3">
                <p>
                  This product is engineered to perform in rigorous industrial environments requiring compliance with worker occupational health & safety norms.
                </p>
                <p>
                  Recommended sectors include: <strong>Automotive fabrication, iron & steel foundries, chemical plants, welding & torch cutting operations, warehousing cargo distribution, and heavy machinery workshops</strong>.
                </p>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4 text-sm text-stone-600">
                <p>
                  Orders are processed and dispatched directly from our Kanpur manufacturing facility. All transactions and invoices are handled in <strong>US Dollars ($)</strong>.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Standard Express Air Freight: 5-8 business days globally.</li>
                  <li>Free Standard Shipping on orders over $50.00.</li>
                  <li>Ocean container load (FCL/LCL) available for bulk B2B shipments.</li>
                </ul>
              </div>
            )}

            {activeTab === 'bulk' && (
              <div className="p-6 rounded-2xl bg-brand-50 border border-brand-200 space-y-4">
                <h4 className="font-serif font-bold text-lg text-brand-900">
                  Container Load & Tiered Wholesale Pricing
                </h4>
                <p className="text-xs sm:text-sm text-brand-800 leading-relaxed">
                  We offer volume discounts for orders of 50+ units, custom embossing of company logos, and bespoke dye colors. Contact our sales department to receive a direct proforma invoice.
                </p>
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md transition-colors"
                >
                  <span>Request Bulk Price Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif font-black text-2xl text-stone-900">
                Related {product.category}
              </h3>
              <Link
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-bold text-brand-600 hover:underline inline-flex items-center gap-1"
              >
                View all in {product.category} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
