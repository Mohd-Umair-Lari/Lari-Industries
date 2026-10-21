import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IContactInquiry extends Document {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  isB2bQuote: boolean;
  productInterest?: string;
  status: 'NEW' | 'READ' | 'REPLIED' | 'CLOSED';
  createdAt: Date;
  updatedAt: Date;
}

const ContactInquirySchema = new Schema<IContactInquiry>(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true, maxlength: 300 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    isB2bQuote: { type: Boolean, default: false },
    productInterest: { type: String, trim: true },
    status: {
      type: String,
      enum: ['NEW', 'READ', 'REPLIED', 'CLOSED'],
      default: 'NEW',
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'contact_inquiries',
  }
);

ContactInquirySchema.index({ email: 1, createdAt: -1 });

const ContactInquiry: Model<IContactInquiry> =
  (mongoose.models.ContactInquiry as Model<IContactInquiry>) ||
  mongoose.model<IContactInquiry>('ContactInquiry', ContactInquirySchema);

export default ContactInquiry;
