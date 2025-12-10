"use client";

import useSWR from "swr";

import { fetchCartItemsByCustomerClerkIdAction } from "@/app/actions/cart.action";
import { CartWithItems } from "@/types/prisma";

interface CartDataResponse {
  cartItems?: CartWithItems | null;
  error?: string;
}

const useCartData = () => {
  const { data, error, isLoading } = useSWR<CartDataResponse>(
    "cart-data",
    async () => {
      return await fetchCartItemsByCustomerClerkIdAction();
    }
  );

  return {
    cart: data?.cartItems,
    error: data?.error || error,
    isLoading,
  };
};

export default useCartData;
