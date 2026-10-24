export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  subCategory?: string;
  price: number;
  originalPrice?: number;
  priceUnit?: string;
  isCustomQuote?: boolean;
  image: string;
  additionalImages?: string[];
  description: string;
  features: string[];
  specs: {
    material: string;
    thickness?: string;
    grade?: string;
    certification?: string;
    averageSize?: string;
    origin: string;
    application: string;
  };
  inStock: boolean;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  bulkDiscount?: {
    minQty: number;
    discountPercent: number;
  };
}

export type ProductCategory = 
  | 'All'
  | 'Aprons'
  | 'Asbestos Gloves'
  | 'Export Gloves'
  | 'Industrial Safety'
  | 'Leg Guards & Spats'
  | 'Harness Leather'
  | 'Hosiery Gloves'
  | 'Kevlar Gloves'
  | 'Leather Sheets'
  | 'Leather Washers'
  | 'Leather Straps'
  | 'Raw Hides'
  | 'Tarpaulin';
