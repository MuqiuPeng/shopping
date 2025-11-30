"use client";

import { ProductGridSkeleton } from "./product-grid-skeleton";
import ProductGridDisplay from "./product-grid-display";
import ProductListDisplay from "./product-list-display";
import ProductListEmpty from "./product-list-empty";
import { product_variants, products } from "@prisma/client";
import { ProductWithVariants } from "@/types/prisma";

interface ProductDisplayProps {
  isLoading: boolean;
  products: ProductWithVariants[];
  viewMode: "grid" | "list";
}

const ProductDisplay = ({
  isLoading,
  products,
  viewMode,
}: ProductDisplayProps) => {
  if (isLoading) {
    return <ProductGridSkeleton viewMode={viewMode} />;
  }

  if (products.length === 0) {
    return (
      <ProductListEmpty
        title="No Products Found"
        description="We couldn't find any products matching your filters. Try adjusting your search criteria or reset your filters to see all available items."
      />
    );
  }

  if (viewMode === "grid") {
    return <ProductGridDisplay products={products} />;
  }

  return <ProductListDisplay products={products} />;
};

export default ProductDisplay;
