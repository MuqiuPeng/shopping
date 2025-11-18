import { create } from 'zustand';

interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string;
  description?: string;
  parentId: string | null;
  isActive: boolean;
  sortOrder: number;
  path: string;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

interface CategoryStore {
  categories: Category[];
  addCategory: (
    data: Omit<Category, 'id' | 'updatedAt' | 'productCount'>
  ) => void;
  updateCategory: (id: string, data: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  fetchCategories: async () => {
    const res = await fetch('/api/categories');
    const data = await res.json();
    set({ categories: data });
  },
  addCategory: (data) =>
    set((state) => ({
      categories: [
        ...state.categories,
        {
          ...data,
          id: Date.now().toString(),
          productCount: 0,
          updatedAt: new Date().toISOString().split('T')[0]
        }
      ]
    })),
  updateCategory: (id, data) =>
    set((state) => ({
      categories: state.categories.map((cat) =>
        cat.id === id
          ? {
              ...cat,
              ...data,
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : cat
      )
    })),
  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter(
        (cat) => cat.id !== id && cat.parentId !== id
      )
    }))
}));
