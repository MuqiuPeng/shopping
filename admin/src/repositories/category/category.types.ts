import { categories } from '@prisma/client';

// ============ Base Types ============

export type Category = categories;

// ============ Input Types ============

export interface GetAllCategoriesInputProps {
  page?: number;
  pageSize?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'name' | 'sortOrder';
  isActive?: boolean;
}

export interface CreateCategoryInput {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface UpdateCategoryInput {
  name?: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
  sortOrder?: number;
}

// ============ Output Types ============

export interface PaginatedCategoriesOutput {
  data: Category[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
