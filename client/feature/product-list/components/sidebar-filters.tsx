"use client";

interface Category {
  id: string;
  name: string;
  path: string;
}

interface SidebarFiltersProps {
  showFilters: boolean;
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  showSaleOnly: boolean;
  onSaleOnlyChange: (checked: boolean) => void;
}

const SidebarFilters = ({
  showFilters,
  categories,
  selectedCategory,
  onCategoryChange,
  showSaleOnly,
  onSaleOnlyChange,
}: SidebarFiltersProps) => {
  return (
    <div
      className={`lg:w-64 space-y-6 ${
        showFilters ? "block" : "hidden lg:block"
      }`}
    >
      {/* Categories Section */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-medium text-foreground mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{category.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Filters Section */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-medium text-foreground mb-4">Quick Filters</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showSaleOnly}
              onChange={(e) => onSaleOnlyChange(e.target.checked)}
              className="rounded border border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
            <span className="text-sm">Sale Items Only</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;
