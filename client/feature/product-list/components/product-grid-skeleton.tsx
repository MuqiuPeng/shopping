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
        <div
          key={i}
          className={
            viewMode === "grid"
              ? "animate-pulse"
              : "flex items-center space-x-4 p-4 bg-card border border-border rounded-xl"
          }
        >
          {viewMode === "grid" ? (
            <>
              <div className="bg-secondary rounded-xl aspect-square mb-4 h-64" />
              <div className="space-y-2">
                <div className="h-4 bg-secondary rounded w-3/4" />
                <div className="h-4 bg-secondary rounded w-1/2" />
              </div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-secondary rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-secondary rounded w-3/4" />
                <div className="h-4 bg-secondary rounded w-1/2" />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
