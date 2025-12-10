"use client";

import { Tag, CreditCard, Truck, Shield, Gift } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PriceCalculatorProps {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  promoCode: string;
  appliedPromo: string | null;
  availableItemsCount: number;
  onPromoCodeChange: (code: string) => void;
  onApplyPromoCode: () => void;
  onRemovePromo: () => void;
}

export default function PriceCalculator({
  subtotal,
  discount,
  shipping,
  tax,
  total,
  promoCode,
  appliedPromo,
  availableItemsCount,
  onPromoCodeChange,
  onApplyPromoCode,
  onRemovePromo,
}: PriceCalculatorProps) {
  return (
    <div className="space-y-6">
      {/* Promo Code */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-medium text-foreground mb-4 flex items-center">
          <Tag className="w-4 h-4 mr-2" />
          Promo Code
        </h3>
        {appliedPromo ? (
          <div className="flex items-center justify-between p-3 bg-accent/10 border border-accent/20 rounded-lg">
            <span className="text-sm font-medium text-accent">
              {appliedPromo} Applied
            </span>
            <button
              onClick={onRemovePromo}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => onPromoCodeChange(e.target.value)}
              className="flex-1 px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all text-sm"
            />
            <Button
              onClick={onApplyPromoCode}
              variant="outline"
              size="sm"
              disabled={!promoCode.trim()}
            >
              Apply
            </Button>
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          Try "PEARL10" for 10% off your first order
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-medium text-foreground mb-4">Order Summary</h3>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">${subtotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Discount</span>
              <span className="text-accent">-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-foreground">
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="text-foreground">${tax.toFixed(2)}</span>
          </div>

          <div className="border-t border-border pt-3">
            <div className="flex justify-between">
              <span className="font-medium text-foreground">Total</span>
              <span className="font-medium text-foreground text-lg">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Shipping Info */}
        {shipping === 0 && (
          <div className="flex items-center space-x-2 mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
            <Truck className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">
              Free shipping included!
            </span>
          </div>
        )}

        {/* Checkout Button */}
        <div className="mt-6 space-y-3">
          <Link href="/checkout/success">
            <Button
              size="lg"
              className="w-full"
              disabled={availableItemsCount === 0}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Proceed to Checkout
            </Button>
          </Link>

          <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
            <Shield className="w-3 h-3" />
            <span>Secure checkout with SSL encryption</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg">
          <Truck className="w-5 h-5 text-accent" />
          <div>
            <div className="text-sm font-medium">Free Shipping</div>
            <div className="text-xs text-muted-foreground">
              On orders over $50
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg">
          <Shield className="w-5 h-5 text-accent" />
          <div>
            <div className="text-sm font-medium">30-Day Returns</div>
            <div className="text-xs text-muted-foreground">
              Easy returns policy
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg">
          <Gift className="w-5 h-5 text-accent" />
          <div>
            <div className="text-sm font-medium">Gift Wrapping</div>
            <div className="text-xs text-muted-foreground">
              Available at checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
