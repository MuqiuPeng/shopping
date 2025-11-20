import { ChevronRight, Check, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryTreeItemProps {
  category: any;
  level?: number;
  expandedIds: Set<string>;
  selectedIds: Set<string>;
  toggleExpand: (id: string) => void;
  toggleSelectCategory: (id: string) => void;
}

export const CategoryTreeItem = ({
  category,
  level = 0,
  expandedIds,
  selectedIds,
  toggleExpand,
  toggleSelectCategory
}: CategoryTreeItemProps) => {
  const hasChildren = category.children && category.children.length > 0;
  const isExpanded = expandedIds.has(category.id);
  const isSelected = selectedIds.has(category.id);

  return (
    <div key={category.id}>
      <div
        className={cn(
          'group flex items-center gap-2 rounded-md transition-all duration-200',
          isSelected ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
        )}
        style={{
          paddingLeft: `${level * 20 + 8}px`,
          paddingTop: '8px',
          paddingBottom: '8px',
          paddingRight: '12px'
        }}
      >
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand(category.id);
            }}
            className='hover:bg-accent/20 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded transition-all duration-200 active:scale-95'
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            <ChevronRight
              size={16}
              className={cn(
                'text-muted-foreground transition-all duration-200',
                isExpanded && 'text-foreground rotate-90'
              )}
            />
          </button>
        )}
        {!hasChildren && <div className='w-5 flex-shrink-0' />}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSelectCategory(category.id);
          }}
          className={cn(
            'flex h-5 w-5 flex-shrink-0 cursor-pointer items-center justify-center rounded border-2 transition-all duration-200',
            isSelected
              ? 'bg-primary border-primary scale-100'
              : 'border-input hover:border-primary hover:bg-accent/10 active:scale-95'
          )}
          aria-label={isSelected ? 'Deselect category' : 'Select category'}
        >
          {isSelected && (
            <Check
              size={14}
              className='text-primary-foreground'
              strokeWidth={3}
            />
          )}
        </button>

        {hasChildren && (
          <Folder
            size={16}
            className={cn(
              'flex-shrink-0 transition-colors duration-200',
              isSelected ? 'text-accent-foreground' : 'text-primary'
            )}
          />
        )}

        <span
          className={cn(
            'flex-1 truncate text-sm font-medium transition-colors duration-200',
            isSelected
              ? 'text-accent-foreground'
              : hasChildren
                ? 'text-foreground'
                : 'text-muted-foreground'
          )}
        >
          {category.name}
        </span>
      </div>
      {hasChildren && isExpanded && (
        <div className='space-y-0'>
          {category.children.map((child: any) => (
            <CategoryTreeItem
              key={child.id}
              category={child}
              level={level + 1}
              expandedIds={expandedIds}
              selectedIds={selectedIds}
              toggleExpand={toggleExpand}
              toggleSelectCategory={toggleSelectCategory}
            />
          ))}
        </div>
      )}
    </div>
  );
};
