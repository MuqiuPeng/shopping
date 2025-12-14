"use client";

import { useMemo } from "react";

interface CartItem {
  price: number;
  originalPrice?: number;
  quantity: number;
  inStock: boolean;
}

interface UsePriceCalculatorProps {
  cartItems: CartItem[];
  appliedPromo: string | null;
}

interface PriceCalculatorResult {
  subtotal: number;
  originalSubtotal: number;
  productSavings: number;
  promoDiscount: number;
  totalSavings: number;
  shipping: number;
  total: number;
  availableItemsCount: number;
}

// Constants - можно вынести в конфиг если нужно
const SHIPPING_COST = 9.99;
const FREE_SHIPPING_THRESHOLD = 50;
const PROMO_CODES = {
  PEARL10: 0.1, // 10% discount
};

const usePriceCalculator = ({
  cartItems,
  appliedPromo,
}: UsePriceCalculatorProps): PriceCalculatorResult => {
  return useMemo(() => {
    // Filter available items
    const availableItems = cartItems.filter((item) => item.inStock);

    // Calculate prices based on current price
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Calculate original prices (before any product discounts)
    const originalSubtotal = cartItems.reduce(
      (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
      0
    );

    // Total savings from product discounts (original price vs current price)
    const productSavings = originalSubtotal - subtotal;

    // Promo code discount (applied on subtotal)
    const promoDiscount =
      appliedPromo && PROMO_CODES[appliedPromo as keyof typeof PROMO_CODES]
        ? subtotal * PROMO_CODES[appliedPromo as keyof typeof PROMO_CODES]
        : 0;

    // Shipping calculation (free if subtotal >= threshold, otherwise fixed cost)
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;

    // Total amount (no tax for now)
    const total = subtotal - promoDiscount + shipping;

    // Total savings (product discounts + promo discount + free shipping bonus)
    const freeShippingBonus =
      subtotal >= FREE_SHIPPING_THRESHOLD &&
      originalSubtotal < FREE_SHIPPING_THRESHOLD
        ? SHIPPING_COST
        : 0;
    const totalSavings = productSavings + promoDiscount + freeShippingBonus;

    return {
      subtotal,
      originalSubtotal,
      productSavings,
      promoDiscount,
      totalSavings,
      shipping,
      total,
      availableItemsCount: availableItems.length,
    };
  }, [cartItems, appliedPromo]);
};

export default usePriceCalculator;
