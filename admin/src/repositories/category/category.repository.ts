'use server';

import { db } from '@/lib/prisma';
import { handleError } from '@/utils';
import { randomUUID } from 'crypto';
import {
  GetAllCategoriesInputProps,
  PaginatedCategoriesOutput,
  CreateCategoryInput,
  UpdateCategoryInput
} from './category.types';

/**
 * Get all categories with pagination
 * @param page 页码，默认为 1
 * @param pageSize 每页数量，默认为 10
 * @param orderBy 排序字段，默认按排序顺序
 * @param isActive 是否激活
 */
export const getAllCategories = async ({
  page = 1,
  pageSize = 10,
  orderBy = 'sortOrder',
  isActive
}: GetAllCategoriesInputProps = {}): Promise<PaginatedCategoriesOutput> => {
  try {
    const skip = (page - 1) * pageSize;

    // Build where clause
    const where: any = {};
    if (isActive !== undefined) where.isActive = isActive;

    const [categories, total] = await Promise.all([
      db.categories.findMany({
        skip,
        take: pageSize,
        where,
        orderBy: { [orderBy]: orderBy === 'sortOrder' ? 'asc' : 'desc' },
        include: {
          _count: {
            select: {
              products: true
            }
          }
        }
      }),
      db.categories.count({ where })
    ]);

    return {
      data: categories as any,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    };
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get category by ID
 * @param id 分类 ID
 * @returns Category 或 null
 */
export const getCategoryById = async (id: string) => {
  try {
    const category = await db.categories.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    return category;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get category by slug
 * @param slug 分类 slug
 * @returns Category 或 null
 */
export const getCategoryBySlug = async (slug: string) => {
  try {
    const category = await db.categories.findUnique({
      where: { slug },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    return category;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Create a new category
 * @param data 分类数据
 * @returns 创建的分类
 */
export const createCategory = async (data: CreateCategoryInput) => {
  try {
    const category = await db.categories.create({
      data: {
        ...data,
        id: randomUUID(),
        updatedAt: new Date()
      }
    });

    return category;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Update a category
 * @param id 分类 ID
 * @param data 更新数据
 * @returns 更新后的分类
 */
export const updateCategory = async (id: string, data: UpdateCategoryInput) => {
  try {
    const category = await db.categories.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });

    return category;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Delete a category (soft delete)
 * @param id 分类 ID
 * @returns 更新后的分类
 */
export const deleteCategory = async (id: string) => {
  try {
    const category = await db.categories.update({
      where: { id },
      data: {
        isActive: false
      }
    });

    return category;
  } catch (error) {
    throw handleError(error);
  }
};
