'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, 
  Eye, 
  ShoppingBag, 
  Star, 
  Check, 
  MessageSquare
} from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatUSD } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.isCustomQuote) {
      window.location.href = `/contact?product=${encodeURIComponent(product.name)}`;
      return;
    }
    addToCart(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <>
      <div
        className={`group relative flex flex-col rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-brand-500/30 transition-all duration-300 overflow-hidden ${
          className || ''
        }`}
      >
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.isBestseller && (
            <Badge variant="brand" size="sm">
              Bestseller
            </Badge>
          )}
          {product.isFeatured && (
            <Badge variant="amber" size="sm">
              Export Grade
            </Badge>
          )}
          {product.bulkDiscount && (
            <Badge variant="success" size="sm">
              Bulk -{product.bulkDiscount.discountPercent}%
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
            isFavorited
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-stone-600 hover:text-rose-500 shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Product Image Container */}
        <Link
          href={`/products/${product.slug}`}
          className="relative aspect-square w-full overflow-hidden bg-stone-100 block"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-108 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/10 transition-colors duration-300" />

          {/* Quick View Button on Hover */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setQuickViewOpen(true);
            }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-stone-900 text-xs font-bold shadow-lg hover:bg-white hover:text-brand-600"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </Link>

        {/* Product Details */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5 text-xs text-stone-500">
              <span className="font-medium uppercase tracking-wider">{product.category}</span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold text-stone-700">{product.rating.toFixed(1)}</span>
                <span className="text-stone-400">({product.reviewCount})</span>
              </div>
            </div>

            <Link href={`/products/${product.slug}`}>
              <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-brand-600 transition-colors line-clamp-1 mb-1.5">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-stone-500 line-clamp-2 mb-3">
              {product.description}
            </p>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
            <div>
              {product.isCustomQuote ? (
                <div>
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                    Custom Choice
                  </span>
                  <div className="text-[10px] text-stone-400">Request Bespoke Quote</div>
                </div>
              ) : (
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-stone-900">
                      {formatUSD(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-stone-400 line-through">
                        {formatUSD(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  {product.priceUnit && (
                    <span className="text-[10px] text-stone-500 block">
                      {product.priceUnit}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Add to Cart / Request Quote Button */}
            {product.isCustomQuote ? (
              <Link
                href={`/contact?product=${encodeURIComponent(product.name)}`}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 hover:bg-brand-600 text-white text-xs font-bold transition-all shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Quote</span>
              </Link>
            ) : (
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                aria-label={`Add ${product.name} to cart`}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs transition-all duration-300 shadow-sm active:scale-95 ${
                  addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-brand-500 hover:bg-brand-600 text-white hover:shadow-brand-500/25'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <QuickViewModal
          product={product}
          isOpen={quickViewOpen}
          onClose={() => setQuickViewOpen(false)}
        />
      )}
    </>
  );
};
