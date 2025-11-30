import { getAllFirstLevelCategory } from "@/app/actions/category.action";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import useSWR from "swr";

const useSidebarCategory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = useCallback(
    (categoryId: string) => {
      setSelectedCategory(categoryId);

      const params = new URLSearchParams(searchParams.toString());

      // Update or remove category parameter
      if (categoryId === "all") {
        params.delete("category");
      } else {
        params.set("category", categoryId);
      }

      // Reset to page 1 when category changes
      params.set("page", "1");

      // Update URL
      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  const { data, isLoading, error } = useSWR("all-categories", async () => {
    const categories = await getAllFirstLevelCategory();
    return categories;
  });

  return {
    handleCategoryChange,
    selectedCategory,
    data,
    isLoading,
    error,
  };
};

export default useSidebarCategory;
