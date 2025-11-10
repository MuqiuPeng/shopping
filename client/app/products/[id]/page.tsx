"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Share2,
  Shield,
  Truck,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Gift,
  MessageCircle,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProductNotFound from "@/component/product-not-found";

// Sample product data (in real app, this would come from API)
interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  materials: string;
  care: string;
  inStock: boolean;
  stockCount: number;
  sale: boolean;
  salePercentage?: number;
}

const productData: Record<string, Product> = {
  "1": {
    id: 1,
    name: "Classic White Pearl Beaded Bracelet",
    price: "$89.99",
    originalPrice: "$120.00",
    images: [
      "/classic-white-pearl-beaded-bracelet.jpg",
      "/hero-pearl-crystal-luxury.jpg",
      "/placeholder.jpg",
    ],
    category: "Pearls",
    rating: 4.8,
    reviewCount: 127,
    description:
      "Elegant white pearl bracelet crafted with premium freshwater pearls. Each pearl is carefully selected for its lustrous finish and perfect round shape. This timeless piece adds sophistication to any outfit, whether casual or formal.",
    features: [
      "Premium freshwater pearls",
      "Hand-strung with silk thread",
      "Sterling silver clasp",
      "Adjustable length 7-8 inches",
      "Comes with luxury gift box",
    ],
    materials: "Freshwater pearls, Sterling silver, Silk thread",
    care: "Wipe with soft cloth after wear. Store in provided pouch. Avoid contact with perfumes and lotions.",
    inStock: true,
    stockCount: 15,
    sale: true,
    salePercentage: 25,
  },
  "2": {
    id: 2,
    name: "Amethyst Crystal Beaded Bracelet",
    price: "$75.99",
    images: [
      "/amethyst-crystal-beaded-bracelet.jpg",
      "/crystal-sparkle-beaded-bracelet.jpg",
      "/placeholder.jpg",
    ],
    category: "Crystals",
    rating: 4.9,
    reviewCount: 89,
    description:
      "Beautiful amethyst crystal bracelet featuring genuine amethyst stones known for their calming properties. The deep purple hues create a stunning accessory that complements both casual and evening wear.",
    features: [
      "Genuine amethyst crystals",
      "Natural stone variations",
      "Elastic cord for comfort",
      "One size fits most",
      "Energy healing properties",
    ],
    materials: "Amethyst crystals, Elastic cord",
    care: "Cleanse with moonlight or sage. Avoid water and harsh chemicals.",
    inStock: true,
    stockCount: 8,
    sale: false,
  },
};

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Absolutely gorgeous! The pearls have such a beautiful luster and the quality is exceptional. Perfect for special occasions.",
    verified: true,
  },
  {
    id: 2,
    name: "Emma L.",
    rating: 5,
    date: "1 month ago",
    comment:
      "Love this bracelet! It's exactly as pictured and feels very luxurious. The packaging was beautiful too.",
    verified: true,
  },
  {
    id: 3,
    name: "Jessica R.",
    rating: 4,
    date: "3 weeks ago",
    comment:
      "Beautiful bracelet, though slightly smaller than expected. Still very happy with the purchase!",
    verified: true,
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState("One Size");
  const [showZoom, setShowZoom] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (productId && productData[productId]) {
      setProduct(productData[productId]);
    }
  }, [productId]);

  if (!product) {
    return <ProductNotFound />;
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, Math.min(product.stockCount, quantity + change)));
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };

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
              Back to Products
            </Link>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? "fill-accent text-accent" : "text-foreground"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.sale && (
                <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Save {product.salePercentage}%
                </div>
              )}
              <button
                onClick={() => setShowZoom(true)}
                className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <ZoomIn className="w-5 h-5" />
              </button>

              {/* Navigation arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-muted-foreground">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
              <h1 className="text-3xl font-light tracking-tight text-foreground mb-4">
                {product.name}
              </h1>

              <div className="flex items-center space-x-3 mb-6">
                <span className="text-2xl font-medium text-accent">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Size</h3>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-primary bg-primary text-primary-foreground rounded-lg text-sm font-medium">
                  One Size
                </button>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Quantity
                </h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-input rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-secondary transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-secondary transition-colors"
                      disabled={quantity >= product.stockCount}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.stockCount} in stock
                  </span>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button className="px-6 py-3 border border-input rounded-lg font-medium hover:bg-secondary transition-colors">
                  <Gift className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg">
                <Shield className="w-5 h-5 text-accent" />
                <div>
                  <div className="text-sm font-medium">Authentic</div>
                  <div className="text-xs text-muted-foreground">
                    Genuine materials
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg">
                <Truck className="w-5 h-5 text-accent" />
                <div>
                  <div className="text-sm font-medium">Free Shipping</div>
                  <div className="text-xs text-muted-foreground">
                    Orders over $50
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg">
                <RefreshCw className="w-5 h-5 text-accent" />
                <div>
                  <div className="text-sm font-medium">30-Day Return</div>
                  <div className="text-xs text-muted-foreground">
                    Easy returns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-border">
            <nav className="flex space-x-8">
              {[
                { id: "description", name: "Description" },
                { id: "features", name: "Features" },
                { id: "care", name: "Care Instructions" },
                { id: "reviews", name: `Reviews (${product.reviewCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose prose-gray max-w-none">
                <p className="text-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "features" && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">
                  Product Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 space-y-2">
                  <h4 className="font-medium text-foreground">Materials</h4>
                  <p className="text-muted-foreground">{product.materials}</p>
                </div>
              </div>
            )}

            {activeTab === "care" && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-foreground">
                  Care Instructions
                </h3>
                <p className="text-foreground leading-relaxed">
                  {product.care}
                </p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">
                    Customer Reviews
                  </h3>
                  <button className="flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">Write a review</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-card border border-border rounded-lg p-6"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-foreground">
                              {review.name}
                            </span>
                            {review.verified && (
                              <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-accent text-accent"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-light tracking-tight text-foreground mb-8">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Add related products here */}
          </div>
        </div>
      </div>
    </div>
  );
}
