import React from 'react';
import CategoryTree from './category-tree';
import CategoryDetail from './category-detail';
import { useCategoryContext } from '../context/category-context';

interface CategoriesListProps {
  searchTerm: string;
  selectedCategoryId: string | null;
  setSearchTerm: (term: string) => void;
  setSelectedCategoryId: (id: string | null) => void;
  selectedCategory: any;
}

const CategoriesList = ({
  searchTerm,
  selectedCategoryId,
  setSearchTerm,
  setSelectedCategoryId,
  selectedCategory
}: CategoriesListProps) => {
  const { categories } = useCategoryContext();

  return (
    <div className='flex flex-1 gap-4 lg:gap-6'>
      <div className='w-full flex-shrink-0 lg:w-80'>
        <CategoryTree
          categories={categories}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
        />
      </div>
      <div className='flex min-w-0 flex-1 flex-col'>
        {selectedCategory ? (
          <CategoryDetail
            category={selectedCategory}
            onUpdate={() => setSelectedCategoryId(null)}
          />
        ) : (
          <div className='border-border bg-card/50 flex h-full flex-col items-center justify-center rounded-lg border'>
            <p className='text-muted-foreground mb-4'>No category selected</p>
            <p className='text-muted-foreground text-xs'>
              Select a category from the list or create a new one
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesList;
