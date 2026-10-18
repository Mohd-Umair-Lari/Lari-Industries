'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatUSD } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div className="bg-stone-50 min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 text-center shadow-sm border border-stone-200/80 space-y-4">
          <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
            <Heart className="w-10 h-10" />
          </div>
          <h1 className="font-serif font-black text-2xl sm:text-3xl text-stone-900">
            Your Wishlist is Empty
          </h1>
          <p className="text-stone-500 text-sm leading-relaxed">
            Save items here while you browse through our safety catalog. Click the heart icon on any product to save it.
          </p>
          <div className="pt-4">
            <Link href="/products">
              <Button size="lg" className="w-full">
                <span>Browse Products (USD)</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 tracking-tight">
              My Saved Wishlist
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {wishlist.length} saved product(s)
            </p>
          </div>
          <button
            onClick={clearWishlist}
            className="text-xs text-stone-400 hover:text-red-600 font-semibold transition-colors self-start sm:self-auto"
          >
            Clear Wishlist
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square w-full bg-stone-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-red-500 shadow-sm transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    {product.category}
                  </span>
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="font-serif font-bold text-base text-stone-900 hover:text-brand-600 transition-colors line-clamp-1 mb-2">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-black text-stone-900">
                      {formatUSD(product.price)}
                    </span>
                    {product.priceUnit && (
                      <span className="text-xs text-stone-500">
                        {product.priceUnit}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Button
                  onClick={() => handleMoveToCart(product)}
                  className="w-full text-xs font-bold py-2.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
                  <span>Move to Cart</span>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
