'use server';

import { db } from '@/lib/prisma';
import { handleError } from '@/utils';
import { randomUUID } from 'crypto';
import {
  GetAllVariantsInputProps,
  PaginatedVariantsOutput,
  CreateVariantInput,
  UpdateVariantInput,
  CreateVariantImageInput,
  UpdateVariantImageInput,
  ReorderVariantImagesInput
} from './product-variant.types';

/**
 * Helper function to serialize variant Decimal fields to numbers
 */
function serializeVariant(variant: any) {
  return {
    ...variant,
    price: Number(variant.price),
    compareAtPrice: variant.compareAtPrice
      ? Number(variant.compareAtPrice)
      : null,
    cost: variant.cost ? Number(variant.cost) : null
  };
}

/**
 * Get all variants with pagination and filters
 * @param page 页码，默认为 1
 * @param pageSize 每页数量，默认为 10
 * @param orderBy 排序字段，默认按排序顺序
 * @param productId 产品ID筛选
 * @param isActive 是否激活
 * @param inStock 是否有库存
 */
export const getAllVariants = async ({
  page = 1,
  pageSize = 10,
  orderBy = 'sortOrder',
  productId,
  isActive,
  inStock
}: GetAllVariantsInputProps = {}): Promise<PaginatedVariantsOutput> => {
  try {
    const skip = (page - 1) * pageSize;

    // Build where clause
    const where: any = {};

    if (productId) where.productId = productId;
    if (isActive !== undefined) where.isActive = isActive;
    if (inStock !== undefined) {
      where.inventory = inStock ? { gt: 0 } : { lte: 0 };
    }

    const [variants, total] = await Promise.all([
      db.product_variants.findMany({
        skip,
        take: pageSize,
        where,
        orderBy: { [orderBy]: orderBy === 'sortOrder' ? 'asc' : 'desc' },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              slug: true,
              thumbnail: true
            }
          },
          variant_images: {
            orderBy: { sortOrder: 'asc' }
          }
        }
      }),
      db.product_variants.count({ where })
    ]);

    const serializedVariants = variants.map(serializeVariant);

    return {
      data: serializedVariants as any,
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
 * Get variant by ID
 * @param id 变体 ID
 * @returns Variant 或 null
 */
export const getVariantById = async (id: string) => {
  try {
    const variant = await db.product_variants.findUnique({
      where: { id },
      include: {
        product: true,
        variant_images: {
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    return variant ? serializeVariant(variant) : null;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get variant by SKU
 * @param sku 变体 SKU
 * @returns Variant 或 null
 */
export const getVariantBySku = async (sku: string) => {
  try {
    const variant = await db.product_variants.findUnique({
      where: { sku },
      include: {
        product: true,
        variant_images: {
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    return variant ? serializeVariant(variant) : null;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Create a new variant
 * @param data 变体数据
 * @returns 创建的变体
 */
export const createVariant = async (data: CreateVariantInput) => {
  try {
    const variant = await db.product_variants.create({
      data,
      include: {
        product: true
      }
    });

    return serializeVariant(variant);
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Update a variant
 * @param id 变体 ID
 * @param data 更新数据
 * @returns 更新后的变体
 */
export const updateVariant = async (id: string, data: UpdateVariantInput) => {
  try {
    const variant = await db.product_variants.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      },
      include: {
        product: true
      }
    });

    return serializeVariant(variant);
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Delete a variant (soft delete)
 * @param id 变体 ID
 * @returns 更新后的变体
 */
export const deleteVariant = async (id: string) => {
  try {
    const variant = await db.product_variants.update({
      where: { id },
      data: {
        isActive: false
      }
    });

    return serializeVariant(variant);
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Update variant inventory
 * @param id 变体 ID
 * @param quantity 库存数量（正数增加，负数减少）
 * @returns 更新后的变体
 */
export const updateInventory = async (id: string, quantity: number) => {
  try {
    const variant = await db.product_variants.update({
      where: { id },
      data: {
        inventory: {
          increment: quantity
        }
      }
    });

    return serializeVariant(variant);
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get low stock variants
 * @returns 低库存变体列表
 */
export const getLowStockVariants = async () => {
  try {
    const variants = await db.product_variants.findMany({
      where: {
        isActive: true,
        trackInventory: true,
        inventory: {
          lte: db.product_variants.fields.lowStockThreshold,
          gt: 0
        }
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      },
      orderBy: {
        inventory: 'asc'
      }
    });

    return variants.map(serializeVariant);
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get out of stock variants
 * @returns 缺货变体列表
 */
export const getOutOfStockVariants = async () => {
  try {
    const variants = await db.product_variants.findMany({
      where: {
        isActive: true,
        trackInventory: true,
        inventory: 0
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        }
      }
    });

    return variants.map(serializeVariant);
  } catch (error) {
    throw handleError(error);
  }
};

// ============ Variant Images ============

/**
 * Get all images for a variant
 * @param variantId 变体 ID
 */
export const getVariantImages = async (variantId: string) => {
  try {
    const images = await db.variant_images.findMany({
      where: { variantId },
      orderBy: { sortOrder: 'asc' }
    });

    return images;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get variant image by ID
 * @param id 图片 ID
 */
export const getVariantImageById = async (id: string) => {
  try {
    const image = await db.variant_images.findUnique({
      where: { id }
    });

    return image;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Create a variant image
 * @param data 图片数据
 */
export const createVariantImage = async (data: CreateVariantImageInput) => {
  try {
    const image = await db.variant_images.create({
      data: {
        ...data,
        id: randomUUID()
      }
    });

    return image;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Create multiple variant images
 * @param images 图片数据数组
 */
export const createVariantImages = async (
  images: CreateVariantImageInput[]
) => {
  try {
    const result = await db.variant_images.createMany({
      data: images.map((img) => ({
        ...img,
        id: randomUUID()
      }))
    });

    return result;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Update a variant image
 * @param id 图片 ID
 * @param data 更新数据
 */
export const updateVariantImage = async (
  id: string,
  data: UpdateVariantImageInput
) => {
  try {
    const image = await db.variant_images.update({
      where: { id },
      data
    });

    return image;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Delete a variant image
 * @param id 图片 ID
 */
export const deleteVariantImage = async (id: string) => {
  try {
    await db.variant_images.delete({
      where: { id }
    });

    return { success: true };
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Reorder variant images
 * @param reorders 重排序数据数组
 */
export const reorderVariantImages = async (
  reorders: ReorderVariantImagesInput[]
) => {
  try {
    await db.$transaction(
      reorders.map((item) =>
        db.variant_images.update({
          where: { id: item.imageId },
          data: { sortOrder: item.sortOrder }
        })
      )
    );

    return { success: true };
  } catch (error) {
    throw handleError(error);
  }
};
