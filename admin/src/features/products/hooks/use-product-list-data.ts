'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getAllProducts,
  GetAllProductsInputProps,
  PaginatedProductsOutput,
  Product
} from '@/repositories';
import { delay } from '@/utils/delay';

interface UseProductListDataOptions
  extends Omit<GetAllProductsInputProps, 'page' | 'pageSize'> {
  initialPage?: number;
  initialPageSize?: number;
  autoLoad?: boolean; // 是否自动加载
}

interface UseProductListDataReturn {
  // 数据
  data: Product[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  } | null;

  // 状态
  isLoading: boolean;
  isRefetching: boolean; // 重新获取数据时为 true（用于刷新）
  error: Error | null;

  // 操作方法
  refetch: () => Promise<void>;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  setFilters: (
    filters: Omit<GetAllProductsInputProps, 'page' | 'pageSize'>
  ) => void;
}

export function useProductListData(
  options: UseProductListDataOptions = {}
): UseProductListDataReturn {
  const {
    initialPage = 1,
    initialPageSize = 10,
    autoLoad = true,
    ...filterOptions
  } = options;

  // 数据状态
  const [data, setData] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<
    PaginatedProductsOutput['pagination'] | null
  >(null);

  // UI 状态
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 分页和筛选状态
  const [page, setPageState] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize);
  const [filters, setFiltersState] =
    useState<Omit<GetAllProductsInputProps, 'page' | 'pageSize'>>(
      filterOptions
    );

  // 获取数据的核心函数
  const fetchData = useCallback(
    async (isRefetch = false) => {
      try {
        if (isRefetch) {
          setIsRefetching(true);
        } else {
          setIsLoading(true);
        }
        setError(null);

        // 添加 1000ms 延迟
        await delay(1000);

        const result = await getAllProducts({
          page,
          pageSize,
          ...filters
        });

        setData(result.data as Product[]);
        setPagination(result.pagination);
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('Failed to fetch products');
        setError(error);
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
        setIsRefetching(false);
      }
    },
    [page, pageSize, filters]
  );

  // 自动加载
  useEffect(() => {
    if (autoLoad) {
      fetchData();
    }
  }, [fetchData, autoLoad]);

  // 重新获取数据
  const refetch = useCallback(async () => {
    await fetchData(true);
  }, [fetchData]);

  // 设置页码
  const setPage = useCallback((newPage: number) => {
    setPageState(newPage);
  }, []);

  // 设置每页数量
  const setPageSize = useCallback((newPageSize: number) => {
    setPageSizeState(newPageSize);
    setPageState(1); // 重置到第一页
  }, []);

  // 下一页
  const nextPage = useCallback(() => {
    if (pagination && page < pagination.totalPages) {
      setPageState(page + 1);
    }
  }, [page, pagination]);

  // 上一页
  const prevPage = useCallback(() => {
    if (page > 1) {
      setPageState(page - 1);
    }
  }, [page]);

  // 设置筛选条件
  const setFilters = useCallback(
    (newFilters: Omit<GetAllProductsInputProps, 'page' | 'pageSize'>) => {
      setFiltersState(newFilters);
      setPageState(1); // 重置到第一页
    },
    []
  );

  return {
    // 数据
    data,
    pagination,

    // 状态
    isLoading,
    isRefetching,
    error,

    // 操作
    refetch,
    setPage,
    setPageSize,
    nextPage,
    prevPage,
    setFilters
  };
}
