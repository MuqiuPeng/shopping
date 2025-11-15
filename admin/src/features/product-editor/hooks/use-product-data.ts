'use client';

import useSWR from 'swr';
import { getProductById } from '@/repositories/product/product.repository';

export function useProductData(productId: string) {
  return useSWR(
    productId ? ['product', productId] : null,
    () => getProductById(productId),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000 // 1 minute
    }
  );
}
