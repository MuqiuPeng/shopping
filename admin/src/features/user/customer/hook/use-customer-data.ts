'use client';

import {
  Customer,
  getAllCustomers,
  GetAllCustomersInputProps
} from '@/repositories';
import { paginationType } from '@/repositories/shared-type';
import { useState, useEffect, useCallback } from 'react';

export function useCustomerData(input: GetAllCustomersInputProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [pagination, setPagination] = useState<paginationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Add 2 second delay before fetching data
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const result = await getAllCustomers(input);

      if (result) {
        setCustomers(result.data);
        setPagination(result.pagination);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch customers'
      );
    } finally {
      setLoading(false);
    }
  }, [input.page, input.pageSize, input.orderBy]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    customers,
    pagination,
    loading,
    error,
    refetch: fetchCustomers
  };
}
