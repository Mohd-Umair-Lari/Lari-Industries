import mongoose, { Document, Model, Schema } from 'mongoose';

const AddressSchema = new Schema(
  {
    label: { type: String, required: true, trim: true, maxlength: 50 }, // 'Home', 'Office', 'Warehouse'
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true, default: '' },
    companyName: { type: String, trim: true },
    gstNumber: { type: String, trim: true },
    addressLine1: { type: String, required: true, trim: true },
    addressLine2: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, trim: true, default: '' },
    pincode: { type: String, trim: true, default: '' },
    country: { type: String, required: true, trim: true, default: 'United States' },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true }
);

export interface IAddress extends Document {
  _id: mongoose.Types.ObjectId;
  label: string;
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  gstNumber?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  pincode?: string;
  country: string;
  isDefault: boolean;
}

export interface IUser extends Document {
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  password?: string; // hashed, for credentials provider
  role: 'customer' | 'admin';
  addresses: IAddress[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    emailVerified: { type: Date },
    image: { type: String },
    password: { type: String, select: false },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    addresses: { type: [AddressSchema], default: [] },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

// Ensure only one default address per user
UserSchema.pre('save', function () {
  if (this.addresses && this.addresses.length > 0) {
    const defaultCount = this.addresses.filter((a) => a.isDefault).length;
    if (defaultCount > 1) {
      // Keep only the first one as default
      let foundFirst = false;
      this.addresses.forEach((a) => {
        if (a.isDefault) {
          if (!foundFirst) foundFirst = true;
          else a.isDefault = false;
        }
      });
    } else if (defaultCount === 0) {
      // Make first address default
      this.addresses[0].isDefault = true;
    }
  }
});

const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>('User', UserSchema);

export default User;