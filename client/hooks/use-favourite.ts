"use client";

import { useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import type { FavoriteWithProduct } from "@/repo/favorite.repo";

// Maximum favorites per user
const MAX_FAVORITES_PER_USER = 10;

/**
 * Hook to get user's favorites list
 */
export const useGetUserFavorites = () => {
  const { data, error, isLoading, mutate } = useSWR<FavoriteWithProduct[]>(
    "user-favorites",
    async () => {
      const { fetchUserFavoritesAction } = await import("@/app/actions");
      const result = await fetchUserFavoritesAction();

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data ?? [];
    },
  );

  return {
    favorites: data,
    error,
    isLoading,
    mutate,
  };
};

/**
 * Hook to get favorites count
 */
export const useGetFavoritesCount = () => {
  const { data, error, isLoading, mutate } = useSWR<number>(
    "user-favorites-count",
    async () => {
      const { fetchUserFavoritesCountAction } = await import("@/app/actions");
      const result = await fetchUserFavoritesCountAction();

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data ?? 0;
    },
  );

  return {
    count: data ?? 0,
    error,
    isLoading,
    mutate,
  };
};

/**
 * Hook to add a product to favorites
 */
export const useAddFavorite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: mutateFavorites } = useGetUserFavorites();
  const { mutate: mutateCount } = useGetFavoritesCount();

  const addFavorite = async (
    productId: string,
    productData?: {
      productName?: string;
      productSlug?: string;
      productImage?: string;
      variantId?: string;
      variantName?: string;
      notes?: string;
    },
  ) => {
    setIsLoading(true);
    try {
      const { addFavoriteAction } = await import("@/app/actions");
      const result = await addFavoriteAction(productId, productData);

      if (result.error) {
        toast.error("Failed to add favorite", {
          description: result.error,
        });
        throw new Error(result.error);
      }

      toast.success("Added to favorites");

      // Refresh favorites list and count
      mutateFavorites();
      mutateCount();

      return result.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addFavorite,
    isLoading,
  };
};

/**
 * Hook to remove a favorite
 */
export const useRemoveFavorite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: mutateFavorites } = useGetUserFavorites();
  const { mutate: mutateCount } = useGetFavoritesCount();

  const removeFavorite = async (favoriteId: string) => {
    setIsLoading(true);
    try {
      const { removeFavoriteAction } = await import("@/app/actions");
      const result = await removeFavoriteAction(favoriteId);

      if (result.error) {
        toast.error("Failed to remove favorite", {
          description: result.error,
        });
        throw new Error(result.error);
      }

      toast.success("Removed from favorites");

      // Refresh favorites list and count
      mutateFavorites();
      mutateCount();

      return result.success;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    removeFavorite,
    isLoading,
  };
};

/**
 * Hook to remove a favorite by product ID
 */
export const useRemoveFavoriteByProductId = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: mutateFavorites } = useGetUserFavorites();
  const { mutate: mutateCount } = useGetFavoritesCount();

  const removeFavoriteByProductId = async (productId: string) => {
    setIsLoading(true);
    try {
      const { removeFavoriteByProductIdAction } = await import("@/app/actions");
      const result = await removeFavoriteByProductIdAction(productId);

      if (result.error) {
        toast.error("Failed to remove favorite", {
          description: result.error,
        });
        throw new Error(result.error);
      }

      toast.success("Removed from favorites");

      // Refresh favorites list and count
      mutateFavorites();
      mutateCount();

      return result.success;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    removeFavoriteByProductId,
    isLoading,
  };
};

/**
 * Hook to toggle favorite status
 */
export const useToggleFavorite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: mutateFavorites } = useGetUserFavorites();
  const { mutate: mutateCount } = useGetFavoritesCount();

  const toggleFavorite = async (
    productId: string,
    productData?: {
      productName?: string;
      productSlug?: string;
      productImage?: string;
      variantId?: string;
      variantName?: string;
    },
  ) => {
    setIsLoading(true);
    try {
      const { toggleFavoriteAction } = await import("@/app/actions");
      const result = await toggleFavoriteAction(productId, productData);

      if (result.error) {
        toast.error("Failed to update favorite", {
          description: result.error,
        });
        throw new Error(result.error);
      }

      toast.success(
        result.data?.isFavorite
          ? "Added to favorites"
          : "Removed from favorites",
      );

      // Refresh favorites list and count
      mutateFavorites();
      mutateCount();

      return result.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    toggleFavorite,
    isLoading,
  };
};

/**
 * Hook to check if a product is in favorites
 */
export const useCheckIsFavorite = (productId: string) => {
  const { data, error, isLoading, mutate } = useSWR<boolean>(
    productId ? `is-favorite-${productId}` : null,
    async () => {
      const { checkIsFavoriteAction } = await import("@/app/actions");
      const result = await checkIsFavoriteAction(productId);

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data ?? false;
    },
  );

  return {
    isFavorite: data ?? false,
    error,
    isLoading,
    mutate,
  };
};

/**
 * Hook to update favorite notes
 */
export const useUpdateFavoriteNotes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: mutateFavorites } = useGetUserFavorites();

  const updateNotes = async (favoriteId: string, notes: string) => {
    setIsLoading(true);
    try {
      const { updateFavoriteNotesAction } = await import("@/app/actions");
      const result = await updateFavoriteNotesAction(favoriteId, notes);

      if (result.error) {
        toast.error("Failed to update notes", {
          description: result.error,
        });
        throw new Error(result.error);
      }

      toast.success("Notes updated");

      // Refresh favorites list
      mutateFavorites();

      return result.data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateNotes,
    isLoading,
  };
};

/**
 * Hook to clear all favorites
 */
export const useClearAllFavorites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: mutateFavorites } = useGetUserFavorites();
  const { mutate: mutateCount } = useGetFavoritesCount();

  const clearAllFavorites = async () => {
    setIsLoading(true);
    try {
      const { clearAllFavoritesAction } = await import("@/app/actions");
      const result = await clearAllFavoritesAction();

      if (result.error) {
        toast.error("Failed to clear favorites", {
          description: result.error,
        });
        throw new Error(result.error);
      }

      toast.success(`Cleared ${result.data?.count || 0} favorites`);

      // Refresh favorites list and count
      mutateFavorites();
      mutateCount();

      return result.data?.count;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    clearAllFavorites,
    isLoading,
  };
};

/**
 * Hook to check if user can add more favorites
 */
export const useCanAddFavorite = () => {
  const { count, isLoading } = useGetFavoritesCount();

  return {
    canAdd: count < MAX_FAVORITES_PER_USER,
    remaining: Math.max(0, MAX_FAVORITES_PER_USER - count),
    isMaxReached: count >= MAX_FAVORITES_PER_USER,
    maxLimit: MAX_FAVORITES_PER_USER,
    isLoading,
  };
};
