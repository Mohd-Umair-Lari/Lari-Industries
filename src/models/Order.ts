import mongoose, { Document, Model, Schema } from 'mongoose';

const ShippingAddressSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    companyName: { type: String, trim: true },
    gstNumber: { type: String, trim: true },
    addressLine1: { type: String, required: true, trim: true },
    addressLine2: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true },
    country: { type: String, required: true, trim: true, default: 'United States' },
  },
  { _id: false }
);

const OrderItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String },
    selectedSize: { type: String },
  },
  { _id: false }
);

export interface IOrder extends Document {
  receiptNumber: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    selectedSize?: string;
  }[];
  subtotal: number;
  discountCode?: string;
  discountAmount: number;
  tax: number;
  shipping: number;
  total: number;
  currency: string;
  shippingAddress: {
    fullName: string;
    email: string;
    phone: string;
    companyName?: string;
    gstNumber?: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    pincode?: string;
    country: string;
  };
  status: 'PENDING' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
  paymentMethod: 'RAZORPAY';
  webhookVerified: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    receiptNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    razorpayPaymentId: {
      type: String,
      sparse: true,
      index: true,
    },
    razorpaySignature: {
      type: String,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: {
        validator: (items: unknown[]) => Array.isArray(items) && items.length > 0,
        message: 'An order must have at least one item',
      },
    },
    subtotal: { type: Number, required: true, min: 0 },
    discountCode: { type: String },
    discountAmount: { type: Number, default: 0, min: 0 },
    tax: { type: Number, required: true, min: 0 },
    shipping: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'USD', uppercase: true },
    shippingAddress: {
      type: ShippingAddressSchema,
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'PAID', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'],
      default: 'PENDING',
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ['RAZORPAY'],
      default: 'RAZORPAY',
    },
    webhookVerified: {
      type: Boolean,
      default: false,
    },
    notes: { type: String },
  },
  {
    timestamps: true,
    collection: 'orders',
  }
);

OrderSchema.index({ 'shippingAddress.email': 1, createdAt: -1 });

const Order: Model<IOrder> =
  (mongoose.models.Order as Model<IOrder>) || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
