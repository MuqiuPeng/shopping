"use client";

import useSWR from "swr";
import * as actions from "@/app/actions";
import { delay } from "@/utils";

const PRODUCT_LIST_PAGE_SIZE = 4;

export const useMarketingProductsList = () => {
  const hotProducts = useSWR(
    "hot-products",
    async () => {
      await delay(500);
      const result = await actions.getHotProductsAction(
        process.env.NEXT_PUBLIC_DEFAULT_HOT_SIZE
          ? parseInt(process.env.NEXT_PUBLIC_DEFAULT_HOT_SIZE)
          : 4
      );
      if (result.success) {
        return result.data;
      }
      throw new Error(result.error || "Failed to fetch hot products");
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      dedupingInterval: 2000,
    }
  );

  const recommendProducts = useSWR(
    "recommend-products",
    async () => {
      await delay(500);
      const result = await actions.getRecommendProductsAction(
        process.env.NEXT_PUBLIC_DEFAULT_HOT_SIZE
          ? parseInt(process.env.NEXT_PUBLIC_DEFAULT_HOT_SIZE)
          : 4
      );
      if (result.success) {
        return result.data;
      }
      throw new Error(result.error || "Failed to fetch hot products");
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 0,
      dedupingInterval: 2000,
    }
  );

  return {
    hotProducts,
    recommendProducts,
  };
};
