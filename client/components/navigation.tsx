"use client";

import { useState } from "react";
import { Search, ShoppingCart, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <h1 className="text-2xl font-light tracking-tight text-foreground">
              Pearl & Crystal
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-sm font-light hover:text-muted-foreground transition"
            >
              Pearls
            </a>
            <a
              href="#"
              className="text-sm font-light hover:text-muted-foreground transition"
            >
              Crystals
            </a>
            <a
              href="#"
              className="text-sm font-light hover:text-muted-foreground transition"
            >
              New Arrivals
            </a>
            <a
              href="#"
              className="text-sm font-light hover:text-muted-foreground transition"
            >
              Sale
            </a>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 cursor-pointer hover:text-muted-foreground transition" />
            <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-muted-foreground transition" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border pt-4">
            <a
              href="#"
              className="block text-sm font-light hover:text-muted-foreground py-2"
            >
              Pearls
            </a>
            <a
              href="#"
              className="block text-sm font-light hover:text-muted-foreground py-2"
            >
              Crystals
            </a>
            <a
              href="#"
              className="block text-sm font-light hover:text-muted-foreground py-2"
            >
              New Arrivals
            </a>
            <a
              href="#"
              className="block text-sm font-light hover:text-muted-foreground py-2"
            >
              Sale
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
