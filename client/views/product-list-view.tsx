"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  Grid,
  List,
  SlidersHorizontal,
  Heart,
  ShoppingCart,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useProductListWithCategory } from "@/hooks/product.hook";
import { Pagination } from "@/components/pagination";

// Sample product data using the available images
const products = [
  {
    id: 1,
    name: "Classic White Pearl Beaded Bracelet",
    price: "$89.99",
    originalPrice: "$120.00",
    image: "/classic-white-pearl-beaded-bracelet.jpg",
    category: "pearls",
    featured: true,
    sale: true,
  },
  {
    id: 2,
    name: "Amethyst Crystal Beaded Bracelet",
    price: "$75.99",
    image: "/amethyst-crystal-beaded-bracelet.jpg",
    category: "crystals",
    featured: false,
    sale: false,
  },
  {
    id: 3,
    name: "Golden Pearl Luxury Bracelet",
    price: "$149.99",
    image: "/golden-pearl-beaded-bracelet-luxury.jpg",
    category: "pearls",
    featured: true,
    sale: false,
  },
  {
    id: 4,
    name: "Aquamarine Crystal Pearl Bracelet",
    price: "$95.99",
    originalPrice: "$125.00",
    image: "/aquamarine-crystal-pearl-beaded-bracelet.jpg",
    category: "mixed",
    featured: false,
    sale: true,
  },
  {
    id: 5,
    name: "Crystal Sparkle Beaded Bracelet",
    price: "$68.99",
    image: "/crystal-sparkle-beaded-bracelet.jpg",
    category: "crystals",
    featured: false,
    sale: false,
  },
  {
    id: 6,
    name: "Mixed Crystal Pearl Bracelet",
    price: "$112.99",
    image: "/mixed-crystal-pearl-beaded-bracelet.jpg",
    category: "mixed",
    featured: true,
    sale: false,
  },
  {
    id: 7,
    name: "Moonstone Pearl Beaded Bracelet",
    price: "$85.99",
    originalPrice: "$110.00",
    image: "/moonstone-pearl-beaded-bracelet.jpg",
    category: "pearls",
    featured: false,
    sale: true,
  },
  {
    id: 8,
    name: "Rose Quartz Crystal Bracelet",
    price: "$79.99",
    image: "/rose-quartz-crystal-beaded-bracelet.jpg",
    category: "crystals",
    featured: false,
    sale: false,
  },
];

const categories = [
  { id: "all", name: "All Products", count: products.length },
  {
    id: "pearls",
    name: "Pearls",
    count: products.filter((p) => p.category === "pearls").length,
  },
  {
    id: "crystals",
    name: "Crystals",
    count: products.filter((p) => p.category === "crystals").length,
  },
  {
    id: "mixed",
    name: "Mixed Collections",
    count: products.filter((p) => p.category === "mixed").length,
  },
];

const sortOptions = [
  { id: "featured", name: "Featured" },
  { id: "price-low", name: "Price: Low to High" },
  { id: "price-high", name: "Price: High to Low" },
  { id: "name", name: "Name A-Z" },
];

// 产品网格加载骨架屏
function ProductGridSkeleton({ viewMode }: { viewMode: "grid" | "list" }) {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
      }
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={
            viewMode === "grid"
              ? "animate-pulse"
              : "flex items-center space-x-4 p-4 bg-card border border-border rounded-xl"
          }
        >
          {viewMode === "grid" ? (
            <>
              <div className="bg-secondary rounded-xl aspect-square mb-4 h-64" />
              <div className="space-y-2">
                <div className="h-4 bg-secondary rounded w-3/4" />
                <div className="h-4 bg-secondary rounded w-1/2" />
              </div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-secondary rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-secondary rounded w-3/4" />
                <div className="h-4 bg-secondary rounded w-1/2" />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

interface ProductListViewProps {
  categoryFromQuery: string;
}

export function ProductListView({ categoryFromQuery }: ProductListViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageFromQuery = parseInt(searchParams.get("page") || "1", 10);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [showSaleOnly, setShowSaleOnly] = useState(false);

  const pageList = useProductListWithCategory({
    categoryId: categoryFromQuery
      ? categoryFromQuery
      : selectedCategory !== "all"
      ? selectedCategory
      : undefined,
    page: pageFromQuery,
  });

  const paginationData = pageList.products.data || {};
  const isLoading = !pageList.products.data;

  // 使用 ref 保存上一次有效的 totalPages，避免加载时闪烁
  const lastValidTotalPagesRef = useRef<number>(1);

  useEffect(() => {
    // 只在有有效数据时更新
    if (paginationData.totalPages && paginationData.totalPages > 0) {
      lastValidTotalPagesRef.current = paginationData.totalPages;
    }
  }, [paginationData.totalPages]);

  // 使用缓存的 totalPages，在加载期间保持稳定
  const totalPages =
    paginationData.totalPages || lastValidTotalPagesRef.current;

  // 基于 currentPage 和 totalPages 计算这些值
  const currentPage = pageFromQuery;
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  // 缓存页面变化处理函数，避免 Pagination 组件重新渲染
  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const price = parseFloat(product.price.replace("$", ""));
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      const matchesSale = !showSaleOnly || product.sale;

      return matchesSearch && matchesCategory && matchesPrice && matchesSale;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        return filtered.sort(
          (a, b) =>
            parseFloat(a.price.replace("$", "")) -
            parseFloat(b.price.replace("$", ""))
        );
      case "price-high":
        return filtered.sort(
          (a, b) =>
            parseFloat(b.price.replace("$", "")) -
            parseFloat(a.price.replace("$", ""))
        );
      case "name":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "featured":
      default:
        return filtered.sort(
          (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        );
    }
  }, [searchQuery, selectedCategory, sortBy, priceRange, showSaleOnly]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <div className="hidden sm:block h-4 w-px bg-border" />
              <h1 className="hidden sm:block text-2xl font-light tracking-tight text-foreground">
                Our Collection
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                {viewMode === "grid" ? (
                  <List className="w-5 h-5" />
                ) : (
                  <Grid className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors lg:hidden"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div
            className={`lg:w-64 space-y-6 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-medium text-foreground mb-4">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search bracelets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-medium text-foreground mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-xs opacity-70">
                        ({category.count})
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-medium text-foreground mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-medium text-foreground mb-4">Filters</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showSaleOnly}
                    onChange={(e) => setShowSaleOnly(e.target.checked)}
                    className="rounded border border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                  <span className="text-sm">Sale Items Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredAndSortedProducts.length} of{" "}
                  {products.length} products
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <ProductGridSkeleton viewMode={viewMode} />
            ) : filteredAndSortedProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredAndSortedProducts.map((product) =>
                  viewMode === "grid" ? (
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
                          <span className="text-accent font-medium">
                            {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="flex items-center space-x-4 p-4 bg-card border border-border rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="relative w-20 h-20 overflow-hidden rounded-lg bg-secondary shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {product.sale && (
                          <div className="absolute top-1 left-1 bg-accent text-accent-foreground px-1 py-0.5 rounded text-xs font-medium">
                            Sale
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-light text-foreground leading-tight truncate">
                          {product.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-accent font-medium">
                            {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 shrink-0">
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                          <Heart className="w-4 h-4 text-foreground" />
                        </button>
                        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                          <ShoppingCart className="w-4 h-4 text-foreground" />
                        </button>
                      </div>
                    </Link>
                  )
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-light text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}

            {/* Pagination */}
            {filteredAndSortedProducts.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
