"use client";

import { toast } from "sonner";
import { useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useCartData from "../hook/use-cart-data";
import CartList from "../component/cart-list";
import PriceCalculator from "../component/price-calculator";
import CartLoading from "../component/cart-loading";
import useUpdateCart from "../hook/use-update-cart.";
import useRemoveItemFromCart from "../hook/use-remove-item-from-cart";
import usePriceCalculator from "../hook/use-price-calculator";
import { CartWithItems } from "@/types/prisma";

// Sample cart data
interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  size: string;
  inStock: boolean;
  variantId: string;
}

export default function CartView() {
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const { cart, error, isLoading, mutate } = useCartData();
  console.log("cart: ", cart);
  const {
    updateCart,
    isLoading: updateCartLoading,
    error: updateCartError,
  } = useUpdateCart();
  const {
    removeItem,
    isLoading: removeItemLoading,
    error: removeItemError,
  } = useRemoveItemFromCart();

  // Map API data to CartItem format
  const cartItems: CartItem[] =
    (cart as CartWithItems)?.items?.map((item) => ({
      id: item.id,
      name: item.variant?.product?.name || "Unknown Product",
      price: parseFloat(item.variant?.price || "0"),
      originalPrice: item.variant?.compareAtPrice
        ? parseFloat(item.variant.compareAtPrice)
        : undefined,
      image: item.variant?.product?.thumbnail || "/placeholder-bracelet.jpg",
      quantity: item.quantity || 1,
      size: item.variant?.name || "One Size",
      inStock: (item.variant?.inventory || 0) > 0,
      variantId: item.variantId,
    })) || [];

  const updateQuantity = async (id: string, newQuantity: number) => {
    const result = await updateCart({
      quantity: newQuantity,
      variantId: id,
    });

    if (result.success) {
      await mutate();
      toast.success("Cart updated", {
        description: "Quantity has been updated",
        duration: 2000,
      });
    } else {
      toast.error("Failed to update cart", {
        description: result.error || "Please try again later",
        duration: 3000,
      });
    }
  };

  const removeItemHandler = async (variantId: string) => {
    const result = await removeItem({ variantId });

    if (result.success) {
      await mutate();
      toast.success("Item removed", {
        description: "Item has been removed from your cart",
        duration: 2000,
      });
    } else {
      toast.error("Failed to remove item", {
        description: result.error || "Please try again later",
        duration: 3000,
      });
    }
  };

  const moveToWishlist = (id: string) => {
    // TODO: Call API to move to wishlist
    // removeItem(id);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "pearl10") {
      setAppliedPromo("PEARL10");
      setPromoCode("");
    }
  };

  // Use price calculator hook
  const {
    subtotal,
    originalSubtotal,
    productSavings,
    promoDiscount,
    totalSavings,
    shipping,
    total,
    availableItemsCount,
  } = usePriceCalculator({
    cartItems,
    appliedPromo,
  });

  if (isLoading || removeItemLoading) {
    return <CartLoading />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/products"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-foreground" />
              <span className="text-sm font-medium text-foreground">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-light text-foreground mb-4">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Discover our beautiful collection of pearl and crystal bracelets
              to add some elegance to your style.
            </p>
            <Link href="/products">
              <Button size="lg" className="px-8">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <CartList
              cartItems={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItemHandler}
              onMoveToWishlist={moveToWishlist}
            />

            {/* Price Calculator */}
            <PriceCalculator
              subtotal={subtotal}
              originalSubtotal={originalSubtotal}
              productSavings={productSavings}
              promoDiscount={promoDiscount}
              totalSavings={totalSavings}
              shipping={shipping}
              total={total}
              promoCode={promoCode}
              appliedPromo={appliedPromo}
              availableItemsCount={availableItemsCount}
              onPromoCodeChange={setPromoCode}
              onApplyPromoCode={applyPromoCode}
              onRemovePromo={() => setAppliedPromo(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
