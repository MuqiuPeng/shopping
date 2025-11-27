"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { prismaType } from "@/types";

interface ProductCardProps {
  product: prismaType.ProductWithVariants;
}

function formatPrice(price: any): string {
  // 处理 Decimal 类型
  if (typeof price === "object" && price !== null) {
    return typeof price.toNumber === "function"
      ? price.toNumber().toFixed(2)
      : String(price);
  }
  return Number(price).toFixed(2);
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // 找到 isDefault 为 true 的 variant，如果没有则取第一个
  const defaultVariant =
    product.variants?.find((v) => v.isDefault) || product.variants?.[0];
  const price = defaultVariant?.price;

  return (
    <div className="group cursor-pointer">
      <div className="relative mb-4 overflow-hidden rounded-lg bg-secondary aspect-square">
        <img
          src={product.thumbnail || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "fill-accent text-accent" : "text-foreground"
            }`}
          />
        </button>
      </div>
      <h3 className="text-lg font-light text-foreground text-balance">
        {product.name}
      </h3>
      {price !== undefined && (
        <p className="text-accent font-light mt-2">${formatPrice(price)}</p>
      )}
    </div>
  );
}
