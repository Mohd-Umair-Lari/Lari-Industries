import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  gstNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  receiptNumber: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  items: OrderItem[];
  subtotal: number;
  discountCode?: string;
  discountAmount: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  shippingAddress: ShippingAddress;
  status: 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
  paymentMethod: 'RAZORPAY';
  webhookVerified?: boolean;
  createdAt: string;
}

export interface LocalOrderSnapshot {
  id: string;
  paymentId: string;
  receiptNumber: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  discountCode?: string | null;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  createdAt: string;
  paymentMethod: 'RAZORPAY';
}
