import { products, product_images, ProductStatus } from '@prisma/client';

// ============ Base Types ============

export type Product = products;
export type ProductImage = product_images;

// ============ Input Types ============

export interface GetAllProductsInputProps {
  page?: number;
  pageSize?: number;
  orderBy?:
    | 'createdAt'
    | 'updatedAt'
    | 'name'
    | 'salesCount'
    | 'viewCount'
    | 'avgRating';
  status?: ProductStatus;
  categoryId?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  isActive?: boolean;
  search?: string;
}

export interface CreateProductInput {
  name: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  categoryId?: string;
  status?: ProductStatus;
  isActive?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

// ============ Variant Input Types ============

export interface ProductVariantInput {
  id?: string; // If provided, update; otherwise create new
  productId?: string;
  sku: string;
  barcode?: string | null;
  name?: string | null;
  price: number;
  compareAtPrice?: number | null;
  cost?: number | null;
  inventory: number;
  lowStockThreshold?: number;
  trackInventory?: boolean;
  size?: string | null;
  color?: string | null;
  material?: string | null;
  weight?: number | null;
  attributes?: any; // JSON field
  isDefault?: boolean;
  sortOrder?: number;
  isActive?: boolean;
  variant_images?: VariantImageInput[];
}

// ============ Image Input Types ============

export interface ProductImageInput {
  id?: string; // If provided, update; otherwise create new
  url: string;
  altText?: string | null;
  sortOrder?: number;
}

export interface VariantImageInput {
  id?: string;
  url: string;
  altText?: string | null;
  sortOrder?: number;
}

// ============ FAQ Input Types ============

export interface ProductFaqInput {
  id?: string; // If provided, update; otherwise create new
  question: string;
  answer: string;
  isActive?: boolean;
  sortOrder?: number;
}

// ============ Update Product Input (Complete) ============

export interface UpdateProductInput {
  // Basic Info
  name?: string;
  slug?: string;
  description?: string | null;
  shortDescription?: string | null;
  thumbnail?: string | null;
  videoUrl?: string | null;

  // Category & Organization
  categoryId?: string | null;
  brandId?: string | null;

  // Status & Flags
  status?: ProductStatus;
  publishedAt?: Date | null;
  isActive?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;

  // SEO
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;

  // Related Data (One-to-Many)
  variants?: ProductVariantInput[];
  product_images?: ProductImageInput[];
  product_faqs?: ProductFaqInput[];

  // Related Data (Many-to-Many)
  tagIds?: string[]; // Array of tag IDs to associate
}

// ============ Output Types ============

export interface PaginatedProductsOutput {
  data: Product[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// ============ Product Image CRUD Types ============

export interface CreateProductImageInput {
  productId: string;
  url: string;
  altText?: string;
  sortOrder?: number;
}

export interface UpdateProductImageInput {
  url?: string;
  altText?: string;
  sortOrder?: number;
}

export interface ReorderProductImagesInput {
  imageId: string;
  sortOrder: number;
}
