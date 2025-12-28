'use client';

import useSWR from 'swr';
import { useQueryState, parseAsInteger, parseAsString } from 'nuqs';
import { useEffect } from 'react';
import { getOrders } from '@/repositories/order/order.repo';
import { GetOrdersResponse } from '@/repositories/order/order.type';
import { OrderStatus, PaymentStatus } from '@prisma/client';

export type UseOrderListParams = {
  pageSize?: number;
  customerId?: string;
  startDate?: Date;
  endDate?: Date;
};

type OrderListQueryParams = {
  page: number;
  pageSize: number;
  search: string | undefined;
  status: string | undefined;
  paymentStatus: string | undefined;
  customerId: string | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
};

export function useOrderList(params: UseOrderListParams = {}) {
  const { pageSize = 10, customerId, startDate, endDate } = params;

  // URL state management with nuqs
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({ clearOnDefault: false })
  );

  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('')
  );

  const [status, setStatus] = useQueryState(
    'status',
    parseAsString.withDefault('')
  );

  const [paymentStatus, setPaymentStatus] = useQueryState(
    'paymentStatus',
    parseAsString.withDefault('')
  );

  // Force page=1 to appear in URL on initial load
  useEffect(() => {
    if (!window.location.search.includes('page=')) {
      setPage(1);
    }
  }, [setPage]);

  // Build SWR key with all query parameters
  const swrKey = [
    'orders',
    {
      page,
      pageSize,
      search: search || undefined,
      status: status || undefined,
      paymentStatus: paymentStatus || undefined,
      customerId,
      startDate,
      endDate
    }
  ] as const;

  // Fetch data with useSWR
  const { data, error, isLoading, mutate } = useSWR<GetOrdersResponse>(
    swrKey,
    async ([_key, params]: [string, OrderListQueryParams]) => {
      return await getOrders({
        page: params.page,
        pageSize: params.pageSize,
        search: params.search,
        status: params.status as OrderStatus | undefined,
        paymentStatus: params.paymentStatus as PaymentStatus | undefined,
        customerId: params.customerId,
        startDate: params.startDate,
        endDate: params.endDate
      });
    },
    {
      keepPreviousData: true,
      revalidateOnFocus: false
    }
  );

  return {
    // Data
    orders: data?.items || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 0,
    currentPage: page,
    pageSize,

    // Loading & Error states
    isLoading,
    error,

    // URL state setters
    setPage,
    setSearch,
    setStatus,
    setPaymentStatus,

    // Current filter values
    filters: {
      search: search || '',
      status: status || '',
      paymentStatus: paymentStatus || ''
    },

    // Revalidate function
    refresh: mutate
  };
}
