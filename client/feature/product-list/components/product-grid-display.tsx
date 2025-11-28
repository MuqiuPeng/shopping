"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  sale?: boolean;
}

interface ProductGridDisplayProps {
  products: Product[];
}

const ProductGridDisplay = ({ products }: ProductGridDisplayProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="group cursor-pointer"
        >
          <div className="relative mb-4 overflow-hidden rounded-xl bg-secondary aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.sale && (
              <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                Sale
              </div>
            )}
            <div className="absolute top-3 right-3 flex space-x-2">
              <button className="p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform">
                <Heart className="w-4 h-4 text-foreground" />
              </button>
              <button className="p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform">
                <ShoppingCart className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-light text-foreground leading-tight">
              {product.name}
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-accent font-medium">{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGridDisplay;
