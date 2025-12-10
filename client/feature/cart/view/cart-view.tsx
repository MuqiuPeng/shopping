"use client";

import { useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useCartData from "../hook/use-cart-data";
import CartList from "../component/cart-list";
import PriceCalculator from "../component/price-calculator";
import CartLoading from "../component/cart-loading";

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
}

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Classic White Pearl Beaded Bracelet",
    price: 89.99,
    originalPrice: 120.0,
    image: "/classic-white-pearl-beaded-bracelet.jpg",
    quantity: 2,
    size: "One Size",
    inStock: true,
  },
  {
    id: "2",
    name: "Amethyst Crystal Beaded Bracelet",
    price: 75.99,
    image: "/amethyst-crystal-beaded-bracelet.jpg",
    quantity: 1,
    size: "One Size",
    inStock: true,
  },
  {
    id: "3",
    name: "Golden Pearl Luxury Bracelet",
    price: 149.99,
    image: "/golden-pearl-beaded-bracelet-luxury.jpg",
    quantity: 1,
    size: "One Size",
    inStock: false,
  },
];

export default function CartView() {
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const { cart, error, isLoading } = useCartData();
  console.log("cart: ", JSON.stringify(cart));

  // Map API data to CartItem format
  const cartItems: CartItem[] =
    cart?.items?.map((item: any) => ({
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
    })) || [];

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    // TODO: Call API to update quantity
    console.log(`Update quantity for item ${id} to ${newQuantity}`);
  };

  const removeItem = (id: string) => {
    // TODO: Call API to remove item
    console.log(`Remove item ${id}`);
  };

  const moveToWishlist = (id: string) => {
    // TODO: Call API to move to wishlist
    removeItem(id);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "pearl10") {
      setAppliedPromo("PEARL10");
      setPromoCode("");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = appliedPromo === "PEARL10" ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  const outOfStockItems = cartItems.filter((item) => !item.inStock);
  const availableItems = cartItems.filter((item) => item.inStock);

  if (isLoading) {
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
              onRemoveItem={removeItem}
              onMoveToWishlist={moveToWishlist}
            />

            {/* Price Calculator */}
            <PriceCalculator
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              tax={tax}
              total={total}
              promoCode={promoCode}
              appliedPromo={appliedPromo}
              availableItemsCount={availableItems.length}
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
