"use client";

import { useState, useEffect } from "react";
import {
  Home,
  Search,
  ArrowLeft,
  Sparkles,
  ShoppingBag,
  Heart,
  Star,
  Gem,
  Crown,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In real app, this would redirect to search results
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const popularCategories = [
    { name: "Pearl Bracelets", href: "/products?category=pearls", icon: Crown },
    { name: "Crystal Collection", href: "/products?category=crystals", icon: Gem },
    { name: "New Arrivals", href: "/products?category=new", icon: Sparkles },
    { name: "Best Sellers", href: "/products?category=bestsellers", icon: Star },
  ];

  const suggestedProducts = [
    {
      id: 1,
      name: "Classic Pearl Elegance",
      price: "$89.99",
      image: "/classic-white-pearl-beaded-bracelet.jpg",
    },
    {
      id: 2,
      name: "Amethyst Dreams",
      price: "$75.99",
      image: "/amethyst-crystal-beaded-bracelet.jpg",
    },
    {
      id: 3,
      name: "Golden Luxury",
      price: "$149.99",
      image: "/golden-pearl-beaded-bracelet-luxury.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-secondary/20">
      {/* Navigation */}
      <div className="border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Crown className="w-6 h-6 text-accent" />
              <span className="text-xl font-light tracking-tight text-foreground">
                Pearl & Crystal
              </span>
            </Link>
            <Link
              href="/"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 404 Hero Section */}
        <div className="text-center mb-16">
          <div className="relative mb-8">
            {/* Animated gems */}
            <div className="absolute inset-0 flex items-center justify-center">
              {mounted && (
                <>
                  <div className="absolute animate-bounce" style={{ animationDelay: "0s" }}>
                    <Gem className="w-8 h-8 text-accent/30 transform rotate-12" />
                  </div>
                  <div className="absolute animate-bounce" style={{ animationDelay: "0.5s", transform: "translate(40px, -20px)" }}>
                    <Crown className="w-6 h-6 text-accent/20 transform -rotate-12" />
                  </div>
                  <div className="absolute animate-bounce" style={{ animationDelay: "1s", transform: "translate(-40px, -20px)" }}>
                    <Sparkles className="w-7 h-7 text-accent/25 transform rotate-45" />
                  </div>
                </>
              )}
            </div>
            
            {/* 404 Text */}
            <div className="relative z-10">
              <h1 className="text-9xl md:text-[12rem] font-light text-accent/20 leading-none">
                404
              </h1>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
              Oops! Page Not Found
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              It seems the precious page you're looking for has vanished like a rare gem. 
              But don't worry, our collection of beautiful jewelry is still here waiting for you.
            </p>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-lg mb-12">
          <div className="text-center mb-6">
            <Search className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-light text-foreground mb-2">Find What You're Looking For</h3>
            <p className="text-muted-foreground">
              Search our collection of exquisite pearls and crystals
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for jewelry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                />
              </div>
              <Button type="submit" size="lg">
                Search
              </Button>
            </div>
          </form>
        </div>

        {/* Popular Categories */}
        <div className="mb-12">
          <h3 className="text-2xl font-light text-foreground text-center mb-8">
            Explore Our Collections
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg hover:border-accent/30 transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-accent mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-medium text-foreground group-hover:text-accent transition-colors">
                    {category.name}
                  </h4>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Suggested Products */}
        <div className="mb-12">
          <h3 className="text-2xl font-light text-foreground text-center mb-8">
            You Might Love These
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {suggestedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-square bg-secondary overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-4 h-4 text-foreground" />
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-light text-foreground mb-2 group-hover:text-accent transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-accent font-medium">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button size="lg" className="px-8">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <Link href="/products">
            <Button variant="outline" size="lg" className="px-8">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Browse Products
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.reload()}
            className="px-8"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
        </div>

        {/* Help Section */}
        <div className="mt-16 bg-linear-to-r from-accent/5 to-accent/10 border border-accent/20 rounded-2xl p-8 text-center">
          <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
          <h3 className="text-xl font-light text-foreground mb-4">Still Need Help?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our customer service team is here to help you find the perfect piece 
            of jewelry or answer any questions you might have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@pearlcrystal.com"
              className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
            >
              Email Support
            </a>
            <a
              href="tel:+1-800-PEARLS"
              className="inline-flex items-center px-6 py-3 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-colors font-medium"
            >
              Call Us: 1-800-PEARLS
            </a>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            "Every precious stone has its own beauty, just like every journey has its perfect destination."
          </p>
        </div>
      </div>
    </div>
  );
}