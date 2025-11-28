"use client";

import Link from "next/link";
import { ArrowLeft, Grid, List, SlidersHorizontal } from "lucide-react";

interface PageHeaderProps {
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  onToggleFilters: () => void;
}

const PageHeader = ({
  viewMode,
  onViewModeChange,
  onToggleFilters,
}: PageHeaderProps) => {
  return (
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
                onViewModeChange(viewMode === "grid" ? "list" : "grid")
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
              onClick={onToggleFilters}
              className="p-2 hover:bg-secondary rounded-lg transition-colors lg:hidden"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
