import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-secondary/20 to-accent/10 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Decorative elements inspired by jewelry */}
        <div className="relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="w-16 h-16 bg-linear-to-br from-accent/20 to-accent/40 rounded-full blur-xl"></div>
          </div>
          <div className="absolute -bottom-4 left-1/4 transform -translate-x-1/2">
            <div className="w-8 h-8 bg-linear-to-br from-primary/10 to-accent/20 rounded-full blur-lg"></div>
          </div>
          <div className="absolute -bottom-6 right-1/4 transform translate-x-1/2">
            <div className="w-12 h-12 bg-linear-to-br from-accent/15 to-primary/20 rounded-full blur-lg"></div>
          </div>

          {/* Main 404 content */}
          <div className="relative z-10">
            <div className="inline-block">
              <h1 className="text-8xl md:text-9xl font-light text-transparent bg-linear-to-br from-primary via-accent/80 to-primary bg-clip-text tracking-tight">
                404
              </h1>
              <div className="h-px bg-linear-to-r from-transparent via-accent/30 to-transparent mt-4"></div>
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-medium text-foreground tracking-wide">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              Sorry, the page you're looking for doesn't exist. Like searching
              for the perfect pearl, sometimes we need to start exploring anew.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5"
            >
              Back to Home
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 border border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-accent/20 transform hover:-translate-y-0.5"
            >
              Browse Products
            </Link>
          </div>

          {/* Decorative bottom text */}
          <div className="pt-8">
            <p className="text-sm text-muted-foreground/70">
              Continue exploring our exquisite diamond bracelet collection
            </p>
          </div>
        </div>

        {/* Bottom decorative elements */}
        <div className="pt-12 relative">
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-accent/40 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary/40 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-accent/40 rounded-full animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
