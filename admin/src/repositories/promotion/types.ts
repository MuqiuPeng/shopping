import { promotions, coupons, PromotionType, CouponType } from '@prisma/client';

// ============ Promotion Types ============

export type Promotion = promotions;

export interface GetAllPromotionsInputProps {
  page?: number;
  pageSize?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'startDate' | 'endDate';
  isActive?: boolean;
  type?: PromotionType;
}

export interface CreatePromotionInput {
  name: string;
  description?: string;
  type: PromotionType;
  value: number;
  startDate: Date;
  endDate: Date;
  isActive?: boolean;
  minPurchase?: number;
  maxDiscount?: number;
  usageLimit?: number;
}

export interface UpdatePromotionInput {
  name?: string;
  description?: string;
  type?: PromotionType;
  value?: number;
  startDate?: Date;
  endDate?: Date;
  isActive?: boolean;
  minPurchase?: number;
  maxDiscount?: number;
  usageLimit?: number;
}

export interface PaginatedPromotionsOutput {
  data: Promotion[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// ============ Coupon Types ============

export type Coupon = coupons;

export interface GetAllCouponsInputProps {
  page?: number;
  pageSize?: number;
  orderBy?: 'createdAt' | 'updatedAt' | 'startDate' | 'endDate';
  isActive?: boolean;
  type?: CouponType;
}

export interface CreateCouponInput {
  code: string;
  description?: string;
  type: CouponType;
  value: number;
  startDate: Date;
  endDate: Date;
  isActive?: boolean;
  minPurchase?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usageLimitPerCustomer?: number;
}

export interface UpdateCouponInput {
  code?: string;
  description?: string;
  type?: CouponType;
  value?: number;
  startDate?: Date;
  endDate?: Date;
  isActive?: boolean;
  minPurchase?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usageLimitPerCustomer?: number;
}

export interface PaginatedCouponsOutput {
  data: Coupon[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
