"use client";

interface ResultsHeaderProps {
  filteredProductsCount: number;
  totalProductsCount: number;
  sortBy: string;
  onSortChange: (value: string) => void;
  sortOptions: Array<{ id: string; name: string }>;
}

const ResultsHeader = ({
  filteredProductsCount,
  totalProductsCount,
  sortBy,
  onSortChange,
  sortOptions,
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
      </div>
    </div>
  );
};

export default ResultsHeader;
