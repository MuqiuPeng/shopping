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

export interface UpdateProductInput {
  name?: string;
  slug?: string;
  description?: string;
  thumbnail?: string;
  categoryId?: string;
  status?: ProductStatus;
  publishedAt?: Date;
  isActive?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  metaTitle?: string;
  metaDescription?: string;
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

// ============ Product Image Types ============

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
