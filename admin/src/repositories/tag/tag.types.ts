import { tags } from '@prisma/client';

// ============ Base Types ============

export type Tag = tags;

// ============ Input Types ============

export interface GetAllTagsInputProps {
  page?: number;
  pageSize?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'name';
  isActive?: boolean;
}

export interface CreateTagInput {
  name: string;
  slug: string;
  description?: string;
  color?: string;
  isActive?: boolean;
  createdBy?: string;
}

export interface UpdateTagInput {
  name?: string;
  slug?: string;
  description?: string;
  color?: string;
  isActive?: boolean;
}

// ============ Output Types ============

export interface PaginatedTagsOutput {
  data: Tag[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
