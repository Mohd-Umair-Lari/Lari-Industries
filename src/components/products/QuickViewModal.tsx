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
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 shadow-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto h-72 md:h-full bg-stone-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="font-bold uppercase tracking-wider text-brand-600">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-stone-800">{product.rating.toFixed(1)}</span>
                  <span className="text-stone-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h2 className="font-serif font-black text-2xl text-stone-900 mb-2">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                {product.isCustomQuote ? (
                  <span className="text-xl font-bold text-brand-600">
                    As Per Custom Choice
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
                      <span className="text-xs text-stone-500 font-medium">
                        {product.priceUnit}
                      </span>
                    )}
                  </>
                )}
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Specifications snippet */}
              <div className="bg-stone-50 rounded-xl p-3 text-xs space-y-1.5 border border-stone-200/60 mb-4">
                <div className="flex justify-between">
                  <span className="text-stone-500">Material:</span>
                  <span className="font-semibold text-stone-800">{product.specs.material}</span>
                </div>
                {product.specs.thickness && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Thickness:</span>
                    <span className="font-semibold text-stone-800">{product.specs.thickness}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-stone-500">Origin:</span>
                  <span className="font-semibold text-stone-800">{product.specs.origin}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2 border-t border-stone-200">
              {!product.isCustomQuote && (
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold text-stone-600">Quantity:</span>
                  <div className="flex items-center border border-stone-300 rounded-xl bg-white shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-stone-100 text-stone-600 rounded-l-xl transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-4 text-xs font-bold text-stone-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-stone-100 text-stone-600 rounded-r-xl transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-2.5 rounded-xl border transition-colors ${
                      isFavorited
                        ? 'border-rose-500 text-rose-500 bg-rose-50'
                        : 'border-stone-200 text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={handleAdd}
                  className="flex-1 py-3 text-sm"
                  variant={added ? 'secondary' : 'primary'}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 mr-2 text-emerald-400" />
                      Added to Cart!
                    </>
                  ) : product.isCustomQuote ? (
                    'Request Custom Choice Quote'
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add {quantity} to Cart ({formatUSD(product.price * quantity)})
                    </>
                  )}
                </Button>
              </div>

              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="block text-center text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline pt-1"
              >
                View Full Technical Specifications <ArrowRight className="inline w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
