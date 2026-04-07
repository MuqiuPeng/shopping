"use client";

import { Grid, List } from "lucide-react";

interface ResultsHeaderProps {
  filteredProductsCount: number;
  totalProductsCount: number;
  sortBy: string;
  onSortChange: (value: string) => void;
  sortOptions: Array<{ id: string; name: string }>;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

const ResultsHeader = ({
  filteredProductsCount,
  totalProductsCount,
  sortBy,
  onSortChange,
  sortOptions,
  viewMode,
  onViewModeChange,
}: ResultsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <div>
        <p className="text-sm text-muted-foreground">
          Showing {filteredProductsCount} of {totalProductsCount} products
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm"
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
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
      </div>
    </div>
  );
};

export default ResultsHeader;
