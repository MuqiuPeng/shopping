"use client";

import { Suspense } from "react";
import { ProductListView } from "@/feature/product-list/views/product-list-view";
import { ProductListSkeleton } from "@/feature/product-list/components/product-skeleton";

export default function ItemsListPage() {
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <ProductListView />
    </Suspense>
  );
}
