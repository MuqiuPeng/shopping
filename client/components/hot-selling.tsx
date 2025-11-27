"use client";

import { useMarketingProductsList } from "@/hooks/product.hook";
import ProductCard from "./product-card";
import { MarketSectionLoading } from "./market-section-loading";
import { prismaType } from "@/types";

export default function HotSelling() {
  const {
    hotProducts: { data, isLoading },
  } = useMarketingProductsList();

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-light text-center text-foreground mb-12 text-balance">
        Hot-Selling Collection
      </h2>

      {isLoading ? (
        <MarketSectionLoading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data?.map((product: prismaType.ProductWithVariants) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-12">
        {isLoading ? null : (
          <button className="px-8 py-3 bg-secondary text-foreground font-light border border-border hover:bg-accent hover:text-accent-foreground transition rounded-lg">
            See More
          </button>
        )}
      </div>
    </section>
  );
}
