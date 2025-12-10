"use client";

import { ShoppingBag, Loader2 } from "lucide-react";

export default function CartLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="h-5 w-32 bg-secondary animate-pulse rounded"></div>
            <div className="h-5 w-24 bg-secondary animate-pulse rounded"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Loading Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Skeleton */}
            <div className="flex items-center justify-between">
              <div className="h-9 w-48 bg-secondary animate-pulse rounded"></div>
              <div className="h-5 w-20 bg-secondary animate-pulse rounded"></div>
            </div>

            {/* Cart Items Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex items-start space-x-4">
                    {/* Image Skeleton */}
                    <div className="relative w-24 h-24 overflow-hidden rounded-lg bg-secondary animate-pulse shrink-0"></div>

                    {/* Content Skeleton */}
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="h-5 w-3/4 bg-secondary animate-pulse rounded"></div>
                      <div className="h-4 w-1/4 bg-secondary animate-pulse rounded"></div>
                      <div className="h-6 w-1/3 bg-secondary animate-pulse rounded"></div>

                      {/* Quantity Controls Skeleton */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="h-10 w-32 bg-secondary animate-pulse rounded-lg"></div>
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 bg-secondary animate-pulse rounded-lg"></div>
                          <div className="h-8 w-8 bg-secondary animate-pulse rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Calculator Loading Skeleton */}
          <div className="space-y-6">
            {/* Promo Code Skeleton */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="h-5 w-32 bg-secondary animate-pulse rounded mb-4"></div>
              <div className="h-10 w-full bg-secondary animate-pulse rounded"></div>
            </div>

            {/* Order Summary Skeleton */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="h-5 w-36 bg-secondary animate-pulse rounded mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="flex justify-between">
                    <div className="h-4 w-20 bg-secondary animate-pulse rounded"></div>
                    <div className="h-4 w-16 bg-secondary animate-pulse rounded"></div>
                  </div>
                ))}
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <div className="h-5 w-16 bg-secondary animate-pulse rounded"></div>
                    <div className="h-6 w-24 bg-secondary animate-pulse rounded"></div>
                  </div>
                </div>
              </div>

              {/* Checkout Button Skeleton */}
              <div className="mt-6 h-12 w-full bg-secondary animate-pulse rounded-lg"></div>
            </div>

            {/* Features Skeleton */}
            <div className="grid grid-cols-1 gap-3">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg"
                >
                  <div className="w-5 h-5 bg-secondary animate-pulse rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-24 bg-secondary animate-pulse rounded"></div>
                    <div className="h-3 w-32 bg-secondary animate-pulse rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Central Loading Indicator */}
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <ShoppingBag className="w-12 h-12 text-accent animate-pulse" />
                <Loader2 className="w-6 h-6 text-accent animate-spin absolute -top-1 -right-1" />
              </div>
              <div className="text-center">
                <p className="text-foreground font-medium">Loading your cart</p>
                <p className="text-muted-foreground text-sm mt-1">
                  Please wait a moment...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
