'use server';

import { db } from '@/lib/prisma';
import { handleError } from '@/utils';
import { ProductStatus } from '@prisma/client';
import { randomUUID } from 'crypto';
import {
  GetAllProductsInputProps,
  PaginatedProductsOutput,
  CreateProductInput,
  UpdateProductInput,
  CreateProductImageInput,
  UpdateProductImageInput,
  ReorderProductImagesInput
} from './product.types';

// 辅助函数：将 Decimal 转换为 number
function serializeProduct(product: any) {
  return {
    ...product,
    avgRating: product.avgRating ? Number(product.avgRating) : null,
    variants: product.variants?.map((v: any) => ({
      ...v,
      price: Number(v.price),
      compareAtPrice: v.compareAtPrice ? Number(v.compareAtPrice) : null,
      cost: v.cost ? Number(v.cost) : null
    }))
  };
}

/**
 * Get all products with pagination and filters
 * @param page 页码，默认为 1
 * @param pageSize 每页数量，默认为 10
 * @param orderBy 排序字段，默认按创建时间降序
 * @param status 产品状态筛选
 * @param categoryId 分类ID筛选
 * @param isFeatured 是否精选
 * @param isNew 是否新品
 * @param isActive 是否激活
 * @param search 搜索关键词
 */
export const getAllProducts = async ({
  page = 1,
  pageSize = 10,
  orderBy = 'createdAt',
  status,
  categoryId,
  isFeatured,
  isNew,
  isActive,
  search
}: GetAllProductsInputProps = {}): Promise<PaginatedProductsOutput> => {
  try {
    const skip = (page - 1) * pageSize;

    // Build where clause
    const where: any = {};

    if (status !== undefined) where.status = status;
    if (categoryId) where.categoryId = categoryId;
    if (isFeatured !== undefined) where.isFeatured = isFeatured;
    if (isNew !== undefined) where.isNew = isNew;
    if (isActive !== undefined) where.isActive = isActive;

    // Search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [products, total] = await Promise.all([
      db.products.findMany({
        skip,
        take: pageSize,
        where,
        orderBy: { [orderBy]: 'desc' },
        include: {
          categories: true,
          variants: {
            where: { isActive: true },
            orderBy: { sortOrder: 'asc' },
            take: 1
          },
          product_images: {
            orderBy: { sortOrder: 'asc' },
            take: 1
          },
          _count: {
            select: {
              variants: true,
              reviews: true,
              wishlist_items: true
            }
          }
        }
      }),
      db.products.count({ where })
    ]);

    // 序列化 Decimal 类型
    const serializedProducts = products.map(serializeProduct);

    return {
      data: serializedProducts as any,
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
 * Get product by ID
 * @param id 产品 ID
 * @returns Product 或 null
 */
export const getProductById = async (id: string) => {
  try {
    const product = await db.products.findUnique({
      where: { id },
      include: {
        categories: true,
        variants: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
          include: {
            variant_images: {
              orderBy: { sortOrder: 'asc' }
            }
          }
        },
        product_images: {
          orderBy: { sortOrder: 'asc' }
        },
        product_tags: {
          include: {
            tags: true
          }
        },
        product_faqs: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' }
        },
        reviews: {
          where: { isApproved: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            customers: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                imageUrl: true
              }
            }
          }
        },
        _count: {
          select: {
            variants: true,
            reviews: true,
            wishlist_items: true
          }
        }
      }
    });

    return product ? serializeProduct(product) : null;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get product by slug
 * @param slug 产品 slug
 * @returns Product 或 null
 */
export const getProductBySlug = async (slug: string) => {
  try {
    const product = await db.products.findUnique({
      where: { slug },
      include: {
        categories: true,
        variants: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' },
          include: {
            variant_images: {
              orderBy: { sortOrder: 'asc' }
            }
          }
        },
        product_images: {
          orderBy: { sortOrder: 'asc' }
        },
        product_tags: {
          include: {
            tags: true
          }
        },
        product_faqs: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    return product ? serializeProduct(product) : null;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Create a new product
 * @param data 产品创建数据
 * @returns 创建的产品
 */
export const createProduct = async (data: CreateProductInput) => {
  try {
    const product = await db.products.create({
      data: {
        ...data,
        status: data.status || ProductStatus.DRAFT,
        publishedAt:
          data.status === ProductStatus.ACTIVE ? new Date() : undefined
      },
      include: {
        categories: true
      }
    });

    return serializeProduct(product);
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Update a product
 * @param id 产品 ID
 * @param data 更新数据
 * @returns 更新后的产品
 */
export const updateProduct = async (id: string, data: UpdateProductInput) => {
  try {
    const product = await db.products.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
        // Auto-set publishedAt when status changes to ACTIVE
        ...(data.status === ProductStatus.ACTIVE &&
          !data.publishedAt && { publishedAt: new Date() })
      },
      include: {
        categories: true,
        variants: true
      }
    });

    return serializeProduct(product);
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Delete a product (soft delete)
 * @param id 产品 ID
 * @returns 更新后的产品
 */
export const deleteProduct = async (id: string) => {
  try {
    const product = await db.products.update({
      where: { id },
      data: {
        status: ProductStatus.ARCHIVED,
        isActive: false
      }
    });

    return serializeProduct(product);
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Increment product view count
 * @param id 产品 ID
 */
export const incrementViewCount = async (id: string) => {
  try {
    await db.products.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1
        }
      }
    });
  } catch (error) {
    throw handleError(error);
  }
};

// ============ Product Images ============

/**
 * Get all images for a product
 * @param productId 产品 ID
 */
export const getProductImages = async (productId: string) => {
  try {
    const images = await db.product_images.findMany({
      where: { productId },
      orderBy: { sortOrder: 'asc' }
    });

    return images;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get product image by ID
 * @param id 图片 ID
 */
export const getProductImageById = async (id: string) => {
  try {
    const image = await db.product_images.findUnique({
      where: { id }
    });

    return image;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Create a product image
 * @param data 图片数据
 */
export const createProductImage = async (data: CreateProductImageInput) => {
  try {
    const image = await db.product_images.create({
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
 * Create multiple product images
 * @param images 图片数据数组
 */
export const createProductImages = async (
  images: CreateProductImageInput[]
) => {
  try {
    const result = await db.product_images.createMany({
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
 * Update a product image
 * @param id 图片 ID
 * @param data 更新数据
 */
export const updateProductImage = async (
  id: string,
  data: UpdateProductImageInput
) => {
  try {
    const image = await db.product_images.update({
      where: { id },
      data
    });

    return image;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Delete a product image
 * @param id 图片 ID
 */
export const deleteProductImage = async (id: string) => {
  try {
    await db.product_images.delete({
      where: { id }
    });

    return { success: true };
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Reorder product images
 * @param reorders 重排序数据数组
 */
export const reorderProductImages = async (
  reorders: ReorderProductImagesInput[]
) => {
  try {
    await db.$transaction(
      reorders.map((item) =>
        db.product_images.update({
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
