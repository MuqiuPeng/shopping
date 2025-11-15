'use server';

import { db } from '@/lib/prisma';
import { handleError } from '@/utils';
import { Decimal } from '@prisma/client/runtime/library';
import {
  GetAllPromotionsInputProps,
  PaginatedPromotionsOutput,
  CreatePromotionInput,
  UpdatePromotionInput
} from './types';

/**
 * Get all promotions with pagination
 * @param page 页码，默认为 1
 * @param pageSize 每页数量，默认为 10
 * @param orderBy 排序字段，默认按创建时间降序
 * @param isActive 是否激活
 * @param type 促销类型
 */
export const getAllPromotions = async ({
  page = 1,
  pageSize = 10,
  orderBy = 'createdAt',
  isActive,
  type
}: GetAllPromotionsInputProps = {}): Promise<PaginatedPromotionsOutput> => {
  try {
    const skip = (page - 1) * pageSize;

    // Build where clause
    const where: any = {};
    if (isActive !== undefined) where.isActive = isActive;
    if (type) where.type = type;

    const [promotions, total] = await Promise.all([
      db.promotions.findMany({
        skip,
        take: pageSize,
        where,
        orderBy: { [orderBy]: 'desc' },
        include: {
          _count: {
            select: {
              promotion_products: true
            }
          }
        }
      }),
      db.promotions.count({ where })
    ]);

    return {
      data: promotions as any,
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
 * Get promotion by ID
 * @param id 促销 ID
 * @returns Promotion 或 null
 */
export const getPromotionById = async (id: string) => {
  try {
    const promotion = await db.promotions.findUnique({
      where: { id },
      include: {
        promotion_products: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                thumbnail: true
              }
            },
            variant: {
              select: {
                id: true,
                name: true,
                sku: true,
                price: true
              }
            }
          }
        },
        _count: {
          select: {
            promotion_products: true
          }
        }
      }
    });

    return promotion;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Create a new promotion
 * @param data 促销数据
 * @returns 创建的促销
 */
export const createPromotion = async (data: CreatePromotionInput) => {
  try {
    const promotion = await db.promotions.create({
      data: {
        ...data,
        value: new Decimal(data.value),
        minPurchase: data.minPurchase
          ? new Decimal(data.minPurchase)
          : undefined,
        maxDiscount: data.maxDiscount
          ? new Decimal(data.maxDiscount)
          : undefined
      }
    });

    return promotion;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Update a promotion
 * @param id 促销 ID
 * @param data 更新数据
 * @returns 更新后的促销
 */
export const updatePromotion = async (
  id: string,
  data: UpdatePromotionInput
) => {
  try {
    const updateData: any = {
      ...data,
      updatedAt: new Date()
    };

    // Convert numbers to Decimal
    if (data.value !== undefined) {
      updateData.value = new Decimal(data.value);
    }
    if (data.minPurchase !== undefined) {
      updateData.minPurchase = data.minPurchase
        ? new Decimal(data.minPurchase)
        : null;
    }
    if (data.maxDiscount !== undefined) {
      updateData.maxDiscount = data.maxDiscount
        ? new Decimal(data.maxDiscount)
        : null;
    }

    const promotion = await db.promotions.update({
      where: { id },
      data: updateData
    });

    return promotion;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Delete a promotion (soft delete)
 * @param id 促销 ID
 * @returns 更新后的促销
 */
export const deletePromotion = async (id: string) => {
  try {
    const promotion = await db.promotions.update({
      where: { id },
      data: {
        isActive: false
      }
    });

    return promotion;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get active promotions
 * @returns 当前有效的促销列表
 */
export const getActivePromotions = async () => {
  try {
    const now = new Date();

    const promotions = await db.promotions.findMany({
      where: {
        isActive: true,
        startDate: { lte: now },
        endDate: { gte: now }
      },
      include: {
        promotion_products: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                thumbnail: true
              }
            },
            variant: {
              select: {
                id: true,
                name: true,
                sku: true,
                price: true
              }
            }
          }
        }
      }
    });

    return promotions;
  } catch (error) {
    throw handleError(error);
  }
};
