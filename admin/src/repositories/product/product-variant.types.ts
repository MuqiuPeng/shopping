import { product_variants, variant_images } from '@prisma/client';

// ============ Base Types ============

export type ProductVariant = product_variants;
export type VariantImage = variant_images;

// ============ Input Types ============

export interface GetAllVariantsInputProps {
  page?: number;
  pageSize?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'price' | 'salesCount' | 'sortOrder';
  productId?: string;
  isActive?: boolean;
  inStock?: boolean;
}

export interface CreateVariantInput {
  productId: string;
  sku: string;
  barcode?: string;
  name?: string;
  price: number;
  compareAtPrice?: number;
  cost?: number;
  inventory?: number;
  lowStockThreshold?: number;
  trackInventory?: boolean;
  size?: string;
  color?: string;
  material?: string;
  weight?: number;
  attributes?: any;
  isDefault?: boolean;
  sortOrder?: number;
  isActive?: boolean;
}

export interface UpdateVariantInput {
  sku?: string;
  barcode?: string;
  name?: string;
  price?: number;
  compareAtPrice?: number;
  cost?: number;
  inventory?: number;
  lowStockThreshold?: number;
  trackInventory?: boolean;
  size?: string;
  color?: string;
  material?: string;
  weight?: number;
  attributes?: any;
  isDefault?: boolean;
  sortOrder?: number;
  isActive?: boolean;
}

// ============ Output Types ============

export interface PaginatedVariantsOutput {
  data: ProductVariant[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// ============ Variant Image Types ============

export interface CreateVariantImageInput {
  variantId: string;
  url: string;
  altText?: string;
  sortOrder?: number;
}

export interface UpdateVariantImageInput {
  url?: string;
  altText?: string;
  sortOrder?: number;
}

export interface ReorderVariantImagesInput {
  imageId: string;
  sortOrder: number;
}
