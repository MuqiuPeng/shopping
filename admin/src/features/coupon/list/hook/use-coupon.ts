'use client';

import { createCoupon, updateCoupon } from '@/repositories';
import {
  CouponListParams,
  getCoupons,
  toggleCouponStatus
} from '@/repositories/coupons/coupon';
import { handleError } from '@/utils';
import { CouponType } from '@prisma/client';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

export const useCoupon = (params?: CouponListParams) => {
  const swrKey = params ? ['coupons', JSON.stringify(params)] : 'coupons';

  const swrData = useSWR(
    swrKey,
    async () => {
      return await getCoupons(params || {});
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000 // 1 minute
    }
  );

  // 创建优惠券
  const createMutation = useSWRMutation(
    swrKey,
    async (
      _key: string,
      {
        arg
      }: {
        arg: {
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
        };
      }
    ) => {
      try {
        const result = await createCoupon(arg);
        await swrData.mutate();
        return result;
      } catch (error) {
        throw handleError(error);
      }
    }
  );

  // 更新优惠券
  const updateMutation = useSWRMutation(
    swrKey,
    async (
      _key: string,
      {
        arg
      }: {
        arg: {
          id: string;
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
          }>;
        };
      }
    ) => {
      try {
        const result = await updateCoupon(arg.id, arg.data);
        await swrData.mutate();
        return result;
      } catch (error) {
        throw handleError(error);
      }
    }
  );

  // 切换优惠券状态
  const toggleStatusMutation = useSWRMutation(
    swrKey,
    async (
      _key: string,
      { arg }: { arg: { id: string; isActive: boolean } }
    ) => {
      try {
        const result = await toggleCouponStatus(arg.id, arg.isActive);
        await swrData.mutate();
        return result;
      } catch (error) {
        throw handleError(error);
      }
    }
  );

  return {
    // 查询数据
    ...swrData,
    data: swrData?.data,
    items: swrData?.data?.items || [],
    total: swrData?.data?.total || 0,
    page: swrData?.data?.page || 1,
    pageSize: swrData?.data?.pageSize || 10,
    isLoading: swrData.isLoading,
    isValidating: swrData.isValidating,

    // 创建操作
    createCoupon: createMutation.trigger,
    isCreating: createMutation.isMutating,
    createError: createMutation.error,

    // 更新操作
    updateCoupon: updateMutation.trigger,
    isUpdating: updateMutation.isMutating,
    updateError: updateMutation.error,

    // 切换状态操作
    toggleStatus: toggleStatusMutation.trigger,
    isToggling: toggleStatusMutation.isMutating,
    toggleError: toggleStatusMutation.error
  };
};

export default useCoupon;
