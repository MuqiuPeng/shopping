/**
 * Example: Using the 10 favorites limit
 */

import {
  useToggleFavorite,
  useCanAddFavorite,
  useGetFavoritesCount,
} from "@/hooks/use-favourite";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/**
 * Example 1: Toggle button with limit check
 */
export function FavoriteButtonWithLimit({
  productId,
  productName,
  productImage,
  isFavorite,
}: {
  productId: string;
  productName: string;
  productImage?: string;
  isFavorite: boolean;
}) {
  const { toggleFavorite, isLoading } = useToggleFavorite();
  const { canAdd, remaining, isMaxReached } = useCanAddFavorite();

  const handleToggle = async () => {
    // If trying to add and limit is reached, show warning
    if (!isFavorite && isMaxReached) {
      toast.warning("Maximum favorites reached", {
        description:
          "You have reached the maximum of 10 favorites. Please remove some before adding new ones.",
      });
      return;
    }

    await toggleFavorite(productId, {
      productName,
      productImage,
    });
  };

  return (
    <div>
      <Button
        variant={isFavorite ? "default" : "outline"}
        onClick={handleToggle}
        disabled={isLoading || (!isFavorite && !canAdd)}
      >
        {isFavorite ? "❤️ Favorited" : "🤍 Add to Favorites"}
      </Button>

      {!isFavorite && !canAdd && (
        <p className="text-sm text-red-500 mt-1">
          Maximum favorites limit reached (10/10)
        </p>
      )}
    </div>
  );
}

/**
 * Example 2: Favorites counter with limit indicator
 */
export function FavoritesCounterWithLimit() {
  const { count, isLoading } = useGetFavoritesCount();
  const { remaining, isMaxReached, maxLimit } = useCanAddFavorite();

  if (isLoading) return <span>...</span>;

  return (
    <div className="flex items-center gap-2">
      <span>My Favorites</span>
      <span
        className={`px-2 py-0.5 text-xs rounded-full ${
          isMaxReached
            ? "bg-red-500 text-white"
            : "bg-primary text-primary-foreground"
        }`}
      >
        {count}/{maxLimit}
      </span>
      {!isMaxReached && remaining > 0 && (
        <span className="text-xs text-muted-foreground">
          {remaining} slots left
        </span>
      )}
    </div>
  );
}

/**
 * Example 3: Add button with disabled state when limit reached
 */
export function AddToFavoritesButtonSmart({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const { toggleFavorite, isLoading } = useToggleFavorite();
  const { canAdd, isMaxReached, remaining } = useCanAddFavorite();

  const handleAdd = async () => {
    if (!canAdd) {
      toast.error("Cannot add to favorites", {
        description:
          "You've reached the maximum of 10 favorites. Remove some favorites to add new ones.",
      });
      return;
    }

    await toggleFavorite(productId, { productName });
  };

  return (
    <div className="space-y-1">
      <Button onClick={handleAdd} disabled={isLoading || !canAdd}>
        {isLoading
          ? "Adding..."
          : isMaxReached
            ? "Max Favorites Reached"
            : "Add to Favorites"}
      </Button>

      {canAdd && remaining <= 3 && (
        <p className="text-xs text-amber-600">
          Only {remaining} favorite slot{remaining !== 1 ? "s" : ""} remaining
        </p>
      )}
    </div>
  );
}

/**
 * Example 4: Favorites page with limit warning
 */
export function FavoritesPage() {
  const { count } = useGetFavoritesCount();
  const { isMaxReached, maxLimit } = useCanAddFavorite();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Favorites</h1>
        <div className="text-sm">
          {count} / {maxLimit} favorites
        </div>
      </div>

      {isMaxReached && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <span className="text-amber-600">⚠️</span>
            <div>
              <h3 className="font-semibold text-amber-900">
                Maximum Favorites Reached
              </h3>
              <p className="text-sm text-amber-700 mt-1">
                You've reached the maximum of {maxLimit} favorites. Remove some
                favorites to add new ones.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Favorites list here */}
    </div>
  );
}

/**
 * Example 5: Product card with smart favorite button
 */
export function ProductCardWithLimitCheck({
  product,
  isFavorite,
}: {
  product: {
    id: string;
    name: string;
    thumbnail: string | null;
  };
  isFavorite: boolean;
}) {
  const { toggleFavorite, isLoading } = useToggleFavorite();
  const { canAdd } = useCanAddFavorite();

  const handleToggle = async () => {
    // Only show limit warning when trying to add (not remove)
    if (!isFavorite && !canAdd) {
      toast.warning("Maximum favorites reached", {
        description: "Remove some favorites before adding new ones.",
      });
      return;
    }

    await toggleFavorite(product.id, {
      productName: product.name,
      productImage: product.thumbnail || undefined,
    });
  };

  return (
    <div className="border rounded-lg p-4">
      <img
        src={product.thumbnail || "/placeholder.png"}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="mt-2 font-semibold">{product.name}</h3>

      <Button
        className="w-full mt-2"
        variant={isFavorite ? "default" : "outline"}
        onClick={handleToggle}
        disabled={isLoading}
      >
        {isFavorite ? "❤️ Favorited" : "🤍 Favorite"}
      </Button>

      {!isFavorite && !canAdd && (
        <p className="text-xs text-red-500 text-center mt-1">Limit reached</p>
      )}
    </div>
  );
}
