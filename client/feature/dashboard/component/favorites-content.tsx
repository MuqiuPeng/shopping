import { Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { linkToProductDetail } from "@/utils";

interface Favorite {
  id: number;
  name: string;
  price: string;
  image: string;
  inStock: boolean;
}

interface FavoritesContentProps {
  favorites: Favorite[];
  onRemoveFavorite: (itemId: number) => void;
}

export default function FavoritesContent({
  favorites,
  onRemoveFavorite,
}: FavoritesContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-light text-foreground">My Favorites</h2>
        <span className="text-sm text-muted-foreground">
          {favorites.length} items
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="bg-card border border-border rounded-xl overflow-hidden group"
          >
            <div className="relative aspect-square bg-secondary">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {!item.inStock && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <span className="text-muted-foreground font-medium">
                    Out of Stock
                  </span>
                </div>
              )}
              <button
                onClick={() => onRemoveFavorite(item.id)}
                className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
              >
                <Trash2 className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-light text-foreground mb-2">{item.name}</h3>
              <div className="flex items-center justify-between">
                <span className="font-medium text-accent">{item.price}</span>
                <Link href={linkToProductDetail(item.id)}>
                  <Button size="sm" disabled={!item.inStock}>
                    {item.inStock ? "View Details" : "Out of Stock"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
