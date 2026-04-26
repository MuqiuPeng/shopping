import { db } from "@/lib/prisma";

class CategoryRepo {
  // Get all first-level categories (those whose parentId is "cat-0")
  static async getAllFirstLevelCategory() {
    try {
      // cat-0 and all marketing categories will be ignored.
      const firstLevelCategoriesResponse = await db.categories.findMany({
        where: {
          parentId: "cate-all",
          NOT: [
            {
              id: { startsWith: "marketing-" },
            },
            {
              id: { startsWith: "cate-all" },
            },
          ],
        },
      });
      return firstLevelCategoriesResponse;
    } catch (error) {
      console.error("Error fetching first level categories:", error);
      return [];
    }
  }

  // get path for a single category by its id
  static async getCategoryPathById(categoryId: string) {
    try {
      const category = await db.categories.findUnique({
        where: { id: categoryId },
        select: { path: true },
      });
      return category ? category.path : null;
    } catch (error) {
      console.error(
        `Error fetching category path for categoryId ${categoryId}:`,
        error,
      );
      return null;
    }
  }
}

export default CategoryRepo;
