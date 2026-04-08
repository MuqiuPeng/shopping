"use client";

import { ArrowLeft, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
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
          <div className="flex items-center space-x-4">
            <Search className="w-5 h-5 cursor-pointer hover:text-muted-foreground transition" />

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
