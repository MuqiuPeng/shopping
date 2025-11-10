"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="block">
              <h1 className="text-2xl font-light tracking-tight text-foreground hover:text-accent transition-colors duration-200">
                Pearl & Crystal
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/products?category=pearls"
              className="text-sm font-light hover:text-muted-foreground transition"
            >
              Pearls
            </Link>
            <Link
              href="/products?category=crystals"
              className="text-sm font-light hover:text-muted-foreground transition"
            >
              Crystals
            </Link>
            <Link
              href="/products?filter=new"
              className="text-sm font-light hover:text-muted-foreground transition"
            >
              New Arrivals
            </Link>
            <Link
              href="/about"
              className="text-sm font-light hover:text-muted-foreground transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-light hover:text-muted-foreground transition"
            >
              Contact Us
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 cursor-pointer hover:text-muted-foreground transition" />

            {/* User Authentication */}
            <SignedIn>
              <Link href="/dashboard">
                <User className="w-5 h-5 cursor-pointer hover:text-muted-foreground transition" />
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
            </SignedIn>

            <SignedOut>
              <Link href="/auth/sign-in">
                <User className="w-5 h-5 cursor-pointer hover:text-muted-foreground transition" />
              </Link>
            </SignedOut>

            <Link href="/cart">
              <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-muted-foreground transition" />
            </Link>
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
            <Link
              href="/products?category=pearls"
              className="block text-sm font-light hover:text-muted-foreground py-2"
            >
              Pearls
            </Link>
            <Link
              href="/products?category=crystals"
              className="block text-sm font-light hover:text-muted-foreground py-2"
            >
              Crystals
            </Link>
            <Link
              href="/products?filter=new"
              className="block text-sm font-light hover:text-muted-foreground py-2"
            >
              New Arrivals
            </Link>
            <Link
              href="/about"
              className="block text-sm font-light hover:text-muted-foreground py-2"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-sm font-light hover:text-muted-foreground py-2"
            >
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
