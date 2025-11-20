'use client';

import useSWR from 'swr';

import { getCategoryByProductId } from '@/repositories/product-category/product-category-repo';
import { Category, getAllCategories } from '@/repositories';
import { delay } from '@/utils/delay';

export type CategoryWithChildren = Category & {
  children: CategoryWithChildren[];
};

function buildCategoryTree(
  categories: CategoryWithChildren[]
): CategoryWithChildren[] {
  const categoryMap = new Map<string, CategoryWithChildren>(
    categories.map((cat) => [
      cat.id,
      { ...cat, children: [] as CategoryWithChildren[] }
    ])
  );
  const roots: CategoryWithChildren[] = [];

  for (const category of categories) {
    const node = categoryMap.get(category.id)!;
    if (category.parentId) {
      const parent = categoryMap.get(category.parentId);
      if (parent) {
        parent.children.push(node);
      }
    } else {
      roots.push(node);
    }
  }

  return roots;
}

const useCategoryData = ({ productId }: { productId: string }) => {
  const swrData = useSWR(
    'products-categories',
    async () => {
      await delay(2000);
      return await getCategoryByProductId(productId);
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000 // 1 minute
    }
  );

  const availableCategories = useSWR(
    'all-categories',
    async () => {
      await delay(2000);
      return await getAllCategories();
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000 // 1 minute
    }
  );

  const availableCategoriesTree = buildCategoryTree(
    (availableCategories?.data || []).map((cat) => ({
      ...cat,
      children: []
    }))
  );

  return {
    ...swrData,
    selectedCategories: swrData?.data || [],
    availableCategories: availableCategories?.data || [],
    availableCategoriesTree,
    refetch: swrData.mutate
  };
};

export default useCategoryData;
