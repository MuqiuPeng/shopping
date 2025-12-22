'use server';

import { db } from '@/lib/prisma';
import { CouponType } from '@prisma/client';

/**
 * 查询参数类型（给 Coupon List Page 用）
 */
export type CouponListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  isActive?: boolean;
  sortBy?: 'createdAt' | 'usageCount';
  sortOrder?: 'asc' | 'desc';
};

/**
 * Coupon List（分页 + 搜索 + 排序）
 */
export async function getCoupons(params: CouponListParams) {
  const {
    page = 1,
    pageSize = 10,
    search,
    isActive,
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = params;

  const where: any = {
    ...(typeof isActive === 'boolean' && { isActive }),
    ...(search && {
      code: {
        contains: search,
        mode: 'insensitive'
      }
    })
  };

  const [items, total] = await Promise.all([
    db.coupons.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        code: true,
        description: true,
        type: true,
        value: true,
        usageCount: true,
        usageLimit: true,
        startDate: true,
        endDate: true,
        isActive: true,
        createdAt: true
      }
    }),
    db.coupons.count({ where })
  ]);

  const transferredItems = items.map((item) => ({
    ...item,
    value: Number(item.value)
  }));

  return {
    items: transferredItems,
    total,
    page,
    pageSize
  };
}

/**
 * 获取单个 Coupon（详情页 / 编辑页）
 */
export async function getCouponById(id: string) {
  return db.coupons.findUnique({
    where: { id }
  });
}

/**
 * 创建 Coupon
 */
export async function createCoupon(data: {
  code: string;
  description?: string;
  type: CouponType;
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usageLimitPerCustomer?: number;
  startDate: Date;
  endDate: Date;
}) {
  return db.coupons.create({
    data
  });
}

/**
 * 更新 Coupon
 */
export async function updateCoupon(
  id: string,
  data: Partial<{
    description: string;
    type: CouponType;
    value: number;
    minPurchase: number;
    maxDiscount: number;
    usageLimit: number;
    usageLimitPerCustomer: number;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
  }>
) {
  return db.coupons.update({
    where: { id },
    data
  });
}

/**
 * 启用 / 停用 Coupon（List Page 常用）
 */
export async function toggleCouponStatus(id: string, isActive: boolean) {
  return db.coupons.update({
    where: { id },
    data: { isActive }
  });
}

/**
 * 判断 Coupon 是否已过期（工具方法）
 */
export async function isCouponExpired(id: string) {
  const coupon = await db.coupons.findUnique({
    where: { id },
    select: { endDate: true }
  });

  if (!coupon) return true;

  return coupon.endDate < new Date();
}
