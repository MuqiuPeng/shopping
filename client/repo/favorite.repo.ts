import { db } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { cuid } from "@/utils/cuid";

// Maximum favorites per user
const MAX_FAVORITES_PER_USER = 10;

// Define favorite query structure
const favoriteBasicInfo = Prisma.validator<Prisma.favoritesDefaultArgs>()({
  select: {
    id: true,
    customerId: true,
    productId: true,
    productName: true,
    productSlug: true,
    productImage: true,
    variantId: true,
    variantName: true,
    notes: true,
    createdAt: true,
    updatedAt: true,
  },
});

// Extract type
export type FavoriteBasicInfo = Prisma.favoritesGetPayload<
  typeof favoriteBasicInfo
>;

// Favorite with product details
const favoriteWithProduct = Prisma.validator<Prisma.favoritesDefaultArgs>()({
  select: {
    id: true,
    customerId: true,
    productId: true,
    productName: true,
    productSlug: true,
    productImage: true,
    variantId: true,
    variantName: true,
    notes: true,
    createdAt: true,
    updatedAt: true,
    products: {
      select: {
        id: true,
        name: true,
        slug: true,
        thumbnail: true,
        isActive: true,
        variants: {
          where: {
            isActive: true,
          },
          select: {
            id: true,
            name: true,
            price: true,
            inventory: true,
          },
        },
      },
    },
  },
});

export type FavoriteWithProduct = Prisma.favoritesGetPayload<
  typeof favoriteWithProduct
>;

export class Favorite {
  /**
   * Get all favorites for a customer
   */
  static async getFavoritesByCustomerId(
    customerId: string,
  ): Promise<FavoriteWithProduct[]> {
    try {
      const favorites = await db.favorites.findMany({
        where: {
          customerId,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          customerId: true,
          productId: true,
          productName: true,
          productSlug: true,
          productImage: true,
          variantId: true,
          variantName: true,
          notes: true,
          createdAt: true,
          updatedAt: true,
          products: {
            select: {
              id: true,
              name: true,
              slug: true,
              thumbnail: true,
              isActive: true,
              variants: {
                where: {
                  isActive: true,
                },
                select: {
                  id: true,
                  name: true,
                  price: true,
                  inventory: true,
                },
              },
            },
          },
        },
      });

      return favorites;
    } catch (error) {
      console.error("Error fetching favorites:", error);
      throw new Error("Failed to fetch favorites");
    }
  }

  /**
   * Add a product to favorites
   * Maximum 10 favorites per user
   */
  static async addFavorite(
    customerId: string,
    productId: string,
    productData: {
      productName?: string;
      productSlug?: string;
      productImage?: string;
      variantId?: string;
      variantName?: string;
      notes?: string;
    } = {},
  ): Promise<FavoriteBasicInfo> {
    try {
      // Check if user has reached the maximum limit
      const currentCount = await db.favorites.count({
        where: {
          customerId,
        },
      });

      if (currentCount >= MAX_FAVORITES_PER_USER) {
        throw new Error(
          `You have reached the maximum limit of ${MAX_FAVORITES_PER_USER} favorites. Please remove some favorites before adding new ones.`,
        );
      }

      const favorite = await db.favorites.create({
        data: {
          id: cuid(),
          customerId,
          productId,
          productName: productData.productName || null,
          productSlug: productData.productSlug || null,
          productImage: productData.productImage || null,
          variantId: productData.variantId || null,
          variantName: productData.variantName || null,
          notes: productData.notes || null,
          updatedAt: new Date(),
        },
        select: {
          id: true,
          customerId: true,
          productId: true,
          productName: true,
          productSlug: true,
          productImage: true,
          variantId: true,
          variantName: true,
          notes: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return favorite;
    } catch (error) {
      // Handle unique constraint violation
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("This product is already in your favorites");
        }
      }
      console.error("Error adding favorite:", error);
      throw new Error("Failed to add favorite");
    }
  }

  /**
   * Remove a favorite by ID
   */
  static async removeFavorite(
    customerId: string,
    favoriteId: string,
  ): Promise<boolean> {
    try {
      const deletionResult = await db.favorites.deleteMany({
        where: {
          id: favoriteId,
          customerId: customerId,
        },
      });

      return deletionResult.count > 0;
    } catch (error) {
      console.error("Error removing favorite:", error);
      return false;
    }
  }

  /**
   * Remove a favorite by product ID
   */
  static async removeFavoriteByProductId(
    customerId: string,
    productId: string,
  ): Promise<boolean> {
    try {
      const deletionResult = await db.favorites.deleteMany({
        where: {
          customerId,
          productId,
        },
      });

      return deletionResult.count > 0;
    } catch (error) {
      console.error("Error removing favorite by product ID:", error);
      return false;
    }
  }

  /**
   * Check if a product is in favorites
   */
  static async checkIsFavorite(
    customerId: string,
    productId: string,
  ): Promise<boolean> {
    try {
      const favorite = await db.favorites.findFirst({
        where: {
          customerId,
          productId,
        },
      });

      return !!favorite;
    } catch (error) {
      console.error("Error checking favorite status:", error);
      return false;
    }
  }

  /**
   * Toggle favorite status (add if not exists, remove if exists)
   */
  static async toggleFavorite(
    customerId: string,
    productId: string,
    productData?: {
      productName?: string;
      productSlug?: string;
      productImage?: string;
      variantId?: string;
      variantName?: string;
    },
  ): Promise<{ isFavorite: boolean; favorite?: FavoriteBasicInfo }> {
    try {
      const existing = await db.favorites.findFirst({
        where: {
          customerId,
          productId,
        },
      });

      if (existing) {
        // Remove from favorites
        await db.favorites.delete({
          where: {
            id: existing.id,
          },
        });

        return { isFavorite: false };
      } else {
        // Check if user has reached the maximum limit
        const currentCount = await db.favorites.count({
          where: {
            customerId,
          },
        });

        if (currentCount >= MAX_FAVORITES_PER_USER) {
          throw new Error(
            `You have reached the maximum limit of ${MAX_FAVORITES_PER_USER} favorites. Please remove some favorites before adding new ones.`,
          );
        }

        // Add to favorites
        const favorite = await this.addFavorite(
          customerId,
          productId,
          productData || {},
        );

        return { isFavorite: true, favorite };
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      throw error;
    }
  }

  /**
   * Get favorites count for a customer
   */
  static async getFavoritesCount(customerId: string): Promise<number> {
    try {
      const count = await db.favorites.count({
        where: {
          customerId,
        },
      });

      return count;
    } catch (error) {
      console.error("Error getting favorites count:", error);
      return 0;
    }
  }

  /**
   * Update favorite notes
   */
  static async updateFavoriteNotes(
    customerId: string,
    favoriteId: string,
    notes: string,
  ): Promise<FavoriteBasicInfo | null> {
    try {
      const favorite = await db.favorites.updateMany({
        where: {
          id: favoriteId,
          customerId,
        },
        data: {
          notes,
          updatedAt: new Date(),
        },
      });

      if (favorite.count === 0) {
        return null;
      }

      // Fetch and return the updated favorite
      const updated = await db.favorites.findUnique({
        where: {
          id: favoriteId,
        },
        select: {
          id: true,
          customerId: true,
          productId: true,
          productName: true,
          productSlug: true,
          productImage: true,
          variantId: true,
          variantName: true,
          notes: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return updated;
    } catch (error) {
      console.error("Error updating favorite notes:", error);
      return null;
    }
  }

  /**
   * Clear all favorites for a customer
   */
  static async clearAllFavorites(customerId: string): Promise<number> {
    try {
      const result = await db.favorites.deleteMany({
        where: {
          customerId,
        },
      });

      return result.count;
    } catch (error) {
      console.error("Error clearing favorites:", error);
      return 0;
    }
  }

  /**
   * Get favorite by ID (with product details)
   */
  static async getFavoriteById(
    favoriteId: string,
  ): Promise<FavoriteWithProduct | null> {
    try {
      const favorite = await db.favorites.findUnique({
        where: {
          id: favoriteId,
        },
        select: {
          id: true,
          customerId: true,
          productId: true,
          productName: true,
          productSlug: true,
          productImage: true,
          variantId: true,
          variantName: true,
          notes: true,
          createdAt: true,
          updatedAt: true,
          products: {
            select: {
              id: true,
              name: true,
              slug: true,
              thumbnail: true,
              isActive: true,
              variants: {
                where: {
                  isActive: true,
                },
                select: {
                  id: true,
                  name: true,
                  price: true,
                  inventory: true,
                },
              },
            },
          },
        },
      });

      return favorite;
    } catch (error) {
      console.error("Error fetching favorite by ID:", error);
      return null;
    }
  }
}
