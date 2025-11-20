'use server';

import { db } from '@/lib/prisma';
import { handleError } from '@/utils';

// 通过 product id 获取该产品关联的所有分类
export const getCategoryByProductId = async (productId: string) => {
  try {
    const productCategories = await db.product_categories.findMany({
      where: { productId },
      include: {
        category: {
          include: {
            _count: {
              select: {
                products: true,
                children: true
              }
            },
            children: true,
            parent: true
          }
        }
      },
      orderBy: [
        { isPrimary: 'desc' }, // 主分类排在前面
        { sortOrder: 'asc' }
      ]
    });

    // 返回分类列表，包含关联信息
    return productCategories.map((pc) => ({
      ...pc.category,
      productCount: pc.category._count.products,
      childrenCount: pc.category._count.children,
      isPrimary: pc.isPrimary, // 是否为主分类
      sortOrder: pc.sortOrder, // 在产品中的排序
      relationCreatedAt: pc.createdAt // 关联创建时间
    }));
  } catch (error) {
    throw handleError(error);
  }
};

// 获取产品的主分类
export const getPrimaryCategoryByProductId = async (productId: string) => {
  try {
    const primaryCategory = await db.product_categories.findFirst({
      where: {
        productId,
        isPrimary: true
      },
      include: {
        category: {
          include: {
            _count: {
              select: {
                products: true
              }
            },
            parent: true
          }
        }
      }
    });

    if (!primaryCategory) return null;

    return {
      ...primaryCategory.category,
      productCount: primaryCategory.category._count.products
    };
  } catch (error) {
    throw handleError(error);
  }
};

// 为产品添加分类关联
export const addCategoryToProduct = async (
  productId: string,
  categoryId: string,
  options?: {
    isPrimary?: boolean;
    sortOrder?: number;
  }
) => {
  try {
    const { isPrimary = false, sortOrder = 0 } = options || {};

    // 如果设置为主分类，先取消其他主分类
    if (isPrimary) {
      await db.product_categories.updateMany({
        where: { productId },
        data: { isPrimary: false }
      });
    }

    const productCategory = await db.product_categories.create({
      data: {
        productId,
        categoryId,
        isPrimary,
        sortOrder
      },
      include: {
        category: true
      }
    });

    return productCategory;
  } catch (error) {
    throw handleError(error);
  }
};

// 从产品中移除分类关联
export const removeCategoryFromProduct = async (
  productId: string,
  categoryId: string
) => {
  try {
    await db.product_categories.delete({
      where: {
        productId_categoryId: {
          productId,
          categoryId
        }
      }
    });

    return { success: true };
  } catch (error) {
    throw handleError(error);
  }
};

// 更新产品的分类关联（批量）
export const updateProductCategories = async (
  productId: string,
  categoryIds: string[],
  primaryCategoryId?: string
) => {
  try {
    await db.$transaction(async (tx) => {
      // 1. 删除现有的所有关联
      await tx.product_categories.deleteMany({
        where: { productId }
      });

      // 2. 创建新的关联
      await tx.product_categories.createMany({
        data: categoryIds.map((categoryId, index) => ({
          productId,
          categoryId,
          isPrimary: categoryId === primaryCategoryId,
          sortOrder: index
        }))
      });
    });

    return { success: true };
  } catch (error) {
    throw handleError(error);
  }
};

// 设置产品的主分类
export const setPrimaryCategory = async (
  productId: string,
  categoryId: string
) => {
  try {
    await db.$transaction(async (tx) => {
      // 取消所有主分类
      await tx.product_categories.updateMany({
        where: { productId },
        data: { isPrimary: false }
      });

      // 设置新的主分类
      await tx.product_categories.update({
        where: {
          productId_categoryId: {
            productId,
            categoryId
          }
        },
        data: { isPrimary: true }
      });
    });

    return { success: true };
  } catch (error) {
    throw handleError(error);
  }
};
