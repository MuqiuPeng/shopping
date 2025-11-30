"use server";

import { CategoryRepo } from "@/repo";

export const getAllFirstLevelCategory = async () => {
  try {
    return await CategoryRepo.getAllFirstLevelCategory();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
