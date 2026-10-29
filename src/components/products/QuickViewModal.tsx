'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  X, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  Plus,
  Minus,
  Heart
} from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatUSD } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!isOpen) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAdd = () => {
    if (product.isCustomQuote) {
      window.location.href = `/contact?product=${encodeURIComponent(product.name)}`;
      return;
    }
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200/80 z-10 overscroll-contain">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 p-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square md:aspect-auto h-64 md:h-full bg-stone-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          </div>

          <div className="p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-bold text-brand-600">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
              </div>

              <h2 className="font-serif font-black text-xl sm:text-2xl text-stone-900 mb-2">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-2 mb-3">
                {product.isCustomQuote ? (
                  <span className="text-xl font-bold text-brand-600">
                    Bespoke Export Order
                  </span>
                ) : (
                  <>
                    <span className="text-3xl font-black text-stone-900">
                      {formatUSD(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-stone-400 line-through">
                        {formatUSD(product.originalPrice)}
                      </span>
                    )}
                    {product.priceUnit && (
                      <span className="text-sm text-stone-500 font-medium">
                        {product.priceUnit}
                      </span>
                    )}
                  </>
                )}
              </div>

              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                {product.description}
              </p>
            </div>

            <div className="space-y-4 pt-3 border-t border-stone-100">
              {!product.isCustomQuote && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                      className="p-3 hover:bg-stone-200/60 text-stone-700 rounded-l-xl transition-colors active:scale-95"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-sm font-bold text-stone-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                      className="p-3 hover:bg-stone-200/60 text-stone-700 rounded-r-xl transition-colors active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => toggleWishlist(product)}
                    aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                    className={`p-3 rounded-xl border transition-colors active:scale-95 ${
                      isFavorited
                        ? 'border-rose-500 text-rose-500 bg-rose-50'
                        : 'border-stone-200 text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>
              )}

              <Button
                onClick={handleAdd}
                className="w-full py-3.5 text-sm font-bold shadow-md"
                variant={added ? 'secondary' : 'primary'}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-emerald-400" />
                    Added to Cart
                  </>
                ) : product.isCustomQuote ? (
                  'Request Custom Quote'
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add {quantity} to Cart ({formatUSD(product.price * quantity)})
                  </>
                )}
              </Button>

              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="block text-center text-sm font-bold text-stone-600 hover:text-brand-600 py-1"
              >
                View Full Details <ArrowRight className="inline w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
