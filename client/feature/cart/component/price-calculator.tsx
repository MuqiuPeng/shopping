"use client";

import { Tag, CreditCard, Truck, Shield, Gift } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PriceCalculatorProps {
  subtotal: number; // 当前价格小计
  originalSubtotal: number; // 原价小计（用于显示节省金额）
  productSavings: number; // 商品折扣节省金额
  promoDiscount: number; // 优惠码折扣金额
  totalSavings: number; // 总节省金额
  shipping: number; // 运费
  total: number; // 总计
  promoCode: string; // 优惠码输入值
  appliedPromo: string | null; // 已应用的优惠码
  availableItemsCount: number; // 可购买商品数量
  onPromoCodeChange: (code: string) => void;
  onApplyPromoCode: () => void;
  onRemovePromo: () => void;
}

export default function PriceCalculator({
  subtotal,
  originalSubtotal,
  productSavings,
  promoDiscount,
  totalSavings,
  shipping,
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
          {/* Original Subtotal (if there are product discounts) */}
          {productSavings > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Original Price</span>
              <span className="text-muted-foreground line-through">
                ${originalSubtotal.toFixed(2)}
              </span>
            </div>
          )}

          {/* Current Subtotal */}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">${subtotal.toFixed(2)}</span>
          </div>

          {/* Product Savings */}
          {productSavings > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Product Discount</span>
              <span className="text-accent font-medium">
                -${productSavings.toFixed(2)}
              </span>
            </div>
          )}

          {/* Promo Code Discount */}
          {promoDiscount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Promo Code</span>
              <span className="text-accent font-medium">
                -${promoDiscount.toFixed(2)}
              </span>
            </div>
          )}

          {/* Shipping */}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-foreground">
              {shipping === 0 ? (
                <span className="text-accent font-medium">Free</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>

          {/* Total Savings Summary */}
          {totalSavings > 0 && (
            <div className="flex justify-between text-sm p-2 bg-accent/10 rounded-lg">
              <span className="text-accent font-medium">Total Savings</span>
              <span className="text-accent font-medium">
                ${totalSavings.toFixed(2)}
              </span>
            </div>
          )}

          {/* Final Total */}
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

        {/* Total Savings Banner - 突出显示节省金额 */}
        {totalSavings && (
          <div className="relative overflow-hidden bg-linear-to-br from-accent/5 via-accent/10 to-accent/5 border-2 border-accent/20 rounded-xl p-5 mt-4">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-16 translate-x-16 blur-3xl" />

            <div className="relative flex items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="shrink-0 w-14 h-14 bg-linear-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20">
                  <Gift className="w-7 h-7 text-accent-foreground" />
                </div>

                {/* Savings Info */}
                <div>
                  <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-1 flex items-center gap-1">
                    <span className="text-base">✨</span>
                    You're Saving
                  </p>
                  <p className="text-3xl font-bold text-accent tracking-tight">
                    ${totalSavings.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    on this order
                  </p>
                </div>
              </div>

              {/* Discount Badge */}
              {productSavings > 0 && (
                <div className="shrink-0 bg-card border-2 border-accent/30 rounded-xl px-4 py-2.5 shadow-sm">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Discount
                  </p>
                  <p className="text-2xl font-bold text-accent">
                    {((productSavings / originalSubtotal) * 100).toFixed(0)}%
                  </p>
                </div>
              )}
            </div>
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
