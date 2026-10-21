'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { Product } from '@/types/product';
import { CartItem, ShippingAddress } from '@/types/cart';
import { VALID_PROMO_CODES } from '@/lib/utils';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  totalItems: number;
  subtotal: number;
  discountAmount: number;
  discountCode: string | null;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress | null;
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  setIsCartOpen: (open: boolean) => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  setShippingAddress: (address: ShippingAddress) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD_USD = 50.00;
const STANDARD_SHIPPING_USD = 5.00;
const TAX_RATE = 0.05;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [shippingAddress, setShippingAddressState] = useState<ShippingAddress | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('lari_cart_usd');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedAddress = localStorage.getItem('lari_shipping_address');
      if (savedAddress) {
        setShippingAddressState(JSON.parse(savedAddress));
      }
      const savedPromo = localStorage.getItem('lari_promo_code');
      if (savedPromo && VALID_PROMO_CODES[savedPromo.toUpperCase()]) {
        setDiscountCode(savedPromo.toUpperCase());
        setDiscountPercent(VALID_PROMO_CODES[savedPromo.toUpperCase()].percent);
      }
    } catch (e) {
      console.error('Error loading cart state from localStorage', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('lari_cart_usd', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart, isHydrated]);

  const addToCart = (product: Product, quantity = 1, size?: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prevCart, { product, quantity, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscountCode(null);
    setDiscountPercent(0);
    try {
      localStorage.removeItem('lari_cart_usd');
      localStorage.removeItem('lari_promo_code');
    } catch (e) {}
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (VALID_PROMO_CODES[cleanCode]) {
      setDiscountCode(cleanCode);
      setDiscountPercent(VALID_PROMO_CODES[cleanCode].percent);
      try {
        localStorage.setItem('lari_promo_code', cleanCode);
      } catch (e) {}
      return {
        success: true,
        message: `Code "${cleanCode}" applied! ${VALID_PROMO_CODES[cleanCode].percent}% OFF.`,
      };
    }
    return {
      success: false,
      message: 'Invalid promotional code. Try SAFETY10 or LARI2026',
    };
  };

  const removePromoCode = () => {
    setDiscountCode(null);
    setDiscountPercent(0);
    try {
      localStorage.removeItem('lari_promo_code');
    } catch (e) {}
  };

  const setShippingAddress = (address: ShippingAddress) => {
    setShippingAddressState(address);
    try {
      localStorage.setItem('lari_shipping_address', JSON.stringify(address));
    } catch (e) {}
  };

  const totalItems = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () =>
      Number(
        cart
          .reduce((acc, item) => acc + item.product.price * item.quantity, 0)
          .toFixed(2)
      ),
    [cart]
  );

  const discountAmount = useMemo(
    () => Number(((subtotal * discountPercent) / 100).toFixed(2)),
    [subtotal, discountPercent]
  );

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = useMemo(
    () => Number((taxableAmount * TAX_RATE).toFixed(2)),
    [taxableAmount]
  );

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD_USD ? 0 : STANDARD_SHIPPING_USD;
  }, [subtotal]);

  const total = useMemo(
    () => Number((taxableAmount + tax + shipping).toFixed(2)),
    [taxableAmount, tax, shipping]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        totalItems,
        subtotal,
        discountAmount,
        discountCode,
        tax,
        shipping,
        total,
        shippingAddress,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        setIsCartOpen,
        applyPromoCode,
        removePromoCode,
        setShippingAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
