'use server';

import { db } from '@/lib/prisma';
import { handleError } from '@/utils';
import { Decimal } from '@prisma/client/runtime/library';
import {
  GetAllCouponsInputProps,
  PaginatedCouponsOutput,
  CreateCouponInput,
  UpdateCouponInput
} from './types';

/**
 * Get all coupons with pagination
 * @param page 页码，默认为 1
 * @param pageSize 每页数量，默认为 10
 * @param orderBy 排序字段，默认按创建时间降序
 * @param isActive 是否激活
 * @param type 优惠券类型
 */
export const getAllCoupons = async ({
  page = 1,
  pageSize = 10,
  orderBy = 'createdAt',
  isActive,
  type
}: GetAllCouponsInputProps = {}): Promise<PaginatedCouponsOutput> => {
  try {
    const skip = (page - 1) * pageSize;

    // Build where clause
    const where: any = {};
    if (isActive !== undefined) where.isActive = isActive;
    if (type) where.type = type;

    const [coupons, total] = await Promise.all([
      db.coupons.findMany({
        skip,
        take: pageSize,
        where,
        orderBy: { [orderBy]: 'desc' },
        include: {
          _count: {
            select: {
              coupon_usages: true,
              orders: true
            }
          }
        }
      }),
      db.coupons.count({ where })
    ]);

    return {
      data: coupons as any,
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
 * Get coupon by ID
 * @param id 优惠券 ID
 * @returns Coupon 或 null
 */
export const getCouponById = async (id: string) => {
  try {
    const coupon = await db.coupons.findUnique({
      where: { id },
      include: {
        coupon_usages: {
          include: {
            coupon: {
              select: {
                code: true
              }
            }
          },
          orderBy: {
            usedAt: 'desc'
          },
          take: 20
        },
        _count: {
          select: {
            coupon_usages: true,
            orders: true
          }
        }
      }
    });

    return coupon;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Get coupon by code
 * @param code 优惠券代码
 * @returns Coupon 或 null
 */
export const getCouponByCode = async (code: string) => {
  try {
    const coupon = await db.coupons.findUnique({
      where: { code },
      include: {
        _count: {
          select: {
            coupon_usages: true,
            orders: true
          }
        }
      }
    });

    return coupon;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Create a new coupon
 * @param data 优惠券数据
 * @returns 创建的优惠券
 */
export const createCoupon = async (data: CreateCouponInput) => {
  try {
    const coupon = await db.coupons.create({
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

    return coupon;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Update a coupon
 * @param id 优惠券 ID
 * @param data 更新数据
 * @returns 更新后的优惠券
 */
export const updateCoupon = async (id: string, data: UpdateCouponInput) => {
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

    const coupon = await db.coupons.update({
      where: { id },
      data: updateData
    });

    return coupon;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Delete a coupon (soft delete)
 * @param id 优惠券 ID
 * @returns 更新后的优惠券
 */
export const deleteCoupon = async (id: string) => {
  try {
    const coupon = await db.coupons.update({
      where: { id },
      data: {
        isActive: false
      }
    });

    return coupon;
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Validate and apply coupon
 * @param code 优惠券代码
 * @param customerId 客户 ID
 * @param orderAmount 订单金额
 * @returns 验证结果和折扣金额
 */
export const validateCoupon = async (
  code: string,
  customerId: string,
  orderAmount: number
) => {
  try {
    const coupon = await getCouponByCode(code);

    if (!coupon) {
      return { valid: false, message: 'Coupon not found' };
    }

    const now = new Date();

    // Check if active
    if (!coupon.isActive) {
      return { valid: false, message: 'Coupon is inactive' };
    }

    // Check date range
    if (now < coupon.startDate) {
      return { valid: false, message: 'Coupon not yet valid' };
    }
    if (now > coupon.endDate) {
      return { valid: false, message: 'Coupon has expired' };
    }

    // Check minimum purchase
    if (coupon.minPurchase && orderAmount < Number(coupon.minPurchase)) {
      return {
        valid: false,
        message: `Minimum purchase amount is ${coupon.minPurchase}`
      };
    }

    // Check total usage limit
    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return { valid: false, message: 'Coupon usage limit reached' };
    }

    // Check per-customer usage limit
    if (coupon.usageLimitPerCustomer) {
      const customerUsageCount = await db.coupon_usages.count({
        where: {
          couponId: coupon.id,
          customerId
        }
      });

      if (customerUsageCount >= coupon.usageLimitPerCustomer) {
        return {
          valid: false,
          message: 'You have reached the usage limit for this coupon'
        };
      }
    }

    // Calculate discount
    let discount = 0;
    if (coupon.type === 'PERCENTAGE') {
      discount = (orderAmount * Number(coupon.value)) / 100;
      if (coupon.maxDiscount && discount > Number(coupon.maxDiscount)) {
        discount = Number(coupon.maxDiscount);
      }
    } else if (coupon.type === 'FIXED_AMOUNT') {
      discount = Number(coupon.value);
    }

    return {
      valid: true,
      discount,
      coupon
    };
  } catch (error) {
    throw handleError(error);
  }
};

/**
 * Record coupon usage
 * @param couponId 优惠券 ID
 * @param customerId 客户 ID
 * @param orderId 订单 ID (可选)
 */
export const recordCouponUsage = async (
  couponId: string,
  customerId: string,
  orderId?: string
) => {
  try {
    await db.$transaction([
      // Create usage record
      db.coupon_usages.create({
        data: {
          couponId,
          customerId,
          orderId
        }
      }),
      // Increment usage count
      db.coupons.update({
        where: { id: couponId },
        data: {
          usageCount: {
            increment: 1
          }
        }
      })
    ]);

    return { success: true };
  } catch (error) {
    throw handleError(error);
  }
};
