'use client';

import { ChevronRight, FolderOpen } from 'lucide-react';
import { useCategoryStore } from '../lib/store';
import { categoryType } from '../schema/category-schema';

interface CategoryTreeItemProps {
  category: any;
  categories: categoryType[];
  isExpanded: boolean;
  selectedId: string | null;
  onToggleExpand: (id: string) => void;
  onSelect: (id: string) => void;
  level: number;
  expandedIds: Set<string>;
}

export default function CategoryTreeItem({
  category,
  categories,
  isExpanded,
  selectedId,
  onToggleExpand,
  onSelect,
  level,
  expandedIds
}: CategoryTreeItemProps) {
  const children = categories.filter((c) => c.parentId === category.id);
  const hasChildren = children.length > 0;

  return (
    <div>
      <div
        onClick={() => onSelect(category.id)}
        className={`flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-2 transition-colors ${
          selectedId === category.id
            ? 'bg-primary text-primary-foreground'
            : 'text-foreground hover:bg-muted'
        }`}
        style={{ marginLeft: `${level * 12}px` }}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(category.id);
            }}
            className='flex-shrink-0'
          >
            <ChevronRight
              className={`h-4 w-4 transition-transform ${
                isExpanded ? 'rotate-90' : ''
              }`}
            />
          </button>
        )}
        {!hasChildren && <div className='w-4' />}
        <FolderOpen className='h-4 w-4 flex-shrink-0' />
        <span className='truncate text-sm'>{category.name}</span>
      </div>

      {isExpanded && hasChildren && (
        <div>
          {children.map((child) => (
            <CategoryTreeItem
              categories={categories}
              key={child.id}
              category={child}
              isExpanded={expandedIds.has(child.id)}
              selectedId={selectedId}
              onToggleExpand={onToggleExpand}
              onSelect={onSelect}
              level={level + 1}
              expandedIds={expandedIds}
            />
          ))}
        </div>
      )}
    </div>
  );
}
