'use client';

import useSWR from 'swr';
import { getMonthlyRevenue } from '@/repositories/order/order.repo';
import { getMonthlyNewCustomers } from '@/repositories/customer/customer.repository';
import { getSixMonthsRevenueData } from '@/repositories/order/order.repo';
import { getOrderStatusDistribution } from '@/repositories/order/order.repo';

const useOverView = () => {
  const { data: revenueData, isLoading: revenueLoading } = useSWR(
    'monthly-revenue',
    getMonthlyRevenue,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  // 获取月度新客户数据
  const { data: customersData, isLoading: customersLoading } = useSWR(
    'monthly-new-customers',
    getMonthlyNewCustomers,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const { data: sixMonthsData, isLoading: sixMonthsLoading } = useSWR(
    'six-months-revenue',
    getSixMonthsRevenueData,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  // 获取订单状态分布数据
  const { data: statusData, isLoading: statusLoading } = useSWR(
    'order-status-distribution',
    getOrderStatusDistribution,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  const isLoading =
    revenueLoading || customersLoading || sixMonthsLoading || statusLoading;

  return {
    // 收入相关
    totalRevenue: revenueData?.totalRevenue || 0,
    totalRevenueGrowthRate: revenueData?.totalRevenueGrowthRate || 0,
    totalRevenueLastMonth: revenueData?.totalRevenueLastMonth || 0,

    // 客户相关
    newCustomers: customersData?.newCustomers || 0,
    newCustomersGrowthRate: customersData?.newCustomersGrowthRate || 0,
    newCustomersLastMonth: customersData?.newCustomersLastMonth || 0,

    // 六个月收入数据
    sixMonthsRevenueData: sixMonthsData || [],

    // 订单状态分布
    orderStatusData: statusData?.data || [],
    orderStatusTotal: statusData?.total || 0,

    // 加载状态
    isLoading
  };
};

export default useOverView;
