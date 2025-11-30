export function ProductGridSkeleton({
  viewMode,
}: {
  viewMode: "grid" | "list";
}) {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
      }
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i}>
          {viewMode === "grid" ? (
            // Grid view skeleton - matches ProductGridDisplay structure
            <div className="group animate-pulse">
              {/* Image skeleton - matches aspect-square */}
              <div className="relative mb-4 overflow-hidden rounded-xl bg-secondary aspect-square" />
              {/* Content skeleton */}
              <div className="space-y-1">
                {/* Title skeleton */}
                <div className="space-y-2 mb-2">
                  <div className="h-4 bg-secondary rounded w-4/5" />
                  <div className="h-4 bg-secondary rounded w-3/5" />
                </div>
                {/* Price skeleton */}
                <div className="flex items-center space-x-2">
                  <div className="h-4 bg-secondary rounded w-20" />
                  <div className="h-4 bg-secondary rounded w-24 opacity-50" />
                </div>
              </div>
            </div>
          ) : (
            // List view skeleton - matches ProductListDisplay structure
            <div className="animate-pulse flex items-center space-x-4 p-4 bg-card border border-border rounded-xl">
              <div className="w-20 h-20 bg-secondary rounded-lg shrink-0" />
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-4 bg-secondary rounded w-4/5" />
                <div className="flex items-center space-x-2">
                  <div className="h-4 bg-secondary rounded w-20" />
                  <div className="h-4 bg-secondary rounded w-24 opacity-50" />
                </div>
              </div>
              <div className="flex space-x-2 shrink-0">
                <div className="w-8 h-8 bg-secondary rounded-lg" />
                <div className="w-8 h-8 bg-secondary rounded-lg" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
