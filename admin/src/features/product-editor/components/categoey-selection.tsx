'use client';

import { useState, useMemo, useRef, useLayoutEffect, useEffect } from 'react';
import { CategoryTreeItem } from './category-tree-item';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight, Search, Check, Folder, Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

interface CategorySelectionDialogProps {
  categories: any[];
  categoriesTree: any[];
  selectedCategories: any[];
  productId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmHandler: (
    productId: string,
    selectedCategories: Array<{ id: string; name: string }>
  ) => void;
}

export const CategorySelection = ({
  productId,
  categories,
  selectedCategories,
  open,
  onOpenChange,
  onConfirmHandler
}: CategorySelectionDialogProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [confirmBtnLoading, setConfirmBtnLoading] = useState<boolean>(false);

  useEffect(() => {
    if (open && Array.isArray(selectedCategories)) {
      const ids = selectedCategories.map((cat) => cat.id);
      setSelectedIds(new Set(ids));
    }
  }, [open, selectedCategories]);

  const categoriesHierarchy = useMemo(() => {
    const categoryMap = new Map(
      categories.map((cat) => [cat.id, { ...cat, children: [] }])
    );
    const roots: any[] = [];

    for (const category of categories) {
      const node = categoryMap.get(category.id)!;
      if (category.parentId) {
        const parent = categoryMap.get(category.parentId);
        if (parent) {
          parent.children.push(node);
        }
      } else {
        roots.push(node);
      }
    }

    return roots;
  }, [categories]);

  const toggleSelectCategory = (categoryId: string) => {
    const viewport = scrollRef.current?.querySelector(
      "[data-slot='scroll-area-viewport']"
    ) as HTMLElement | null;
    if (viewport) {
      lastScrollTop.current = viewport.scrollTop;
    }

    const newSelected = new Set(selectedIds);
    if (newSelected.has(categoryId)) {
      newSelected.delete(categoryId);
    } else {
      newSelected.add(categoryId);
    }
    setSelectedIds(newSelected);
  };

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categoriesHierarchy;

    const searchLower = searchTerm.toLowerCase();
    return categoriesHierarchy.filter((cat) => {
      const matchesSearch = cat.name.toLowerCase().includes(searchLower);
      const hasMatchingChildren =
        cat.children &&
        cat.children.some((child: any) => {
          const recurseCheck = (c: any) =>
            c.name.toLowerCase().includes(searchLower) ||
            (c.children && c.children.some(recurseCheck));
          return recurseCheck(child);
        });

      return matchesSearch || hasMatchingChildren;
    });
  }, [categoriesHierarchy, searchTerm]);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const handleConfirm = async () => {
    setConfirmBtnLoading(true);
    const selectedCategories = categories.flatMap((cat) => {
      const result: Array<{ id: string; name: string }> = [];
      const traverse = (c: any) => {
        if (selectedIds.has(c.id)) {
          result.push({ id: c.id, name: c.name });
        }
        if (c.children) {
          c.children.forEach(traverse);
        }
      };
      traverse(cat);
      return result;
    });

    await onConfirmHandler(productId, selectedCategories);
    setConfirmBtnLoading(false);
    onOpenChange(false);
    setSearchTerm('');
    setExpandedIds(new Set());
    setSelectedIds(new Set());
  };

  // CategoryTreeItem 已提取为独立组件

  useLayoutEffect(() => {
    const viewport = scrollRef.current?.querySelector(
      "[data-slot='scroll-area-viewport']"
    ) as HTMLElement | null;
    if (viewport) {
      viewport.scrollTop = lastScrollTop.current;
    }
  }, [selectedIds]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Select Categories</DialogTitle>
          <DialogDescription>
            Choose one or more categories for your product
          </DialogDescription>
        </DialogHeader>

        <div className='relative'>
          <Search
            className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transform'
            size={18}
          />
          <Input
            placeholder='Search categories...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>

        <ScrollArea
          className='border-border bg-card h-96 rounded-lg border p-3'
          ref={scrollRef}
        >
          {filteredCategories.length > 0 ? (
            <div className='space-y-1'>
              {filteredCategories.map((category) => (
                <CategoryTreeItem
                  key={category.id}
                  category={category}
                  level={0}
                  expandedIds={expandedIds}
                  selectedIds={selectedIds}
                  toggleExpand={toggleExpand}
                  toggleSelectCategory={toggleSelectCategory}
                />
              ))}
            </div>
          ) : (
            <div className='flex h-full items-center justify-center'>
              <p className='text-muted-foreground text-sm'>
                No categories found
              </p>
            </div>
          )}
        </ScrollArea>

        <div className='flex justify-end gap-2 pt-2'>
          <Button
            disabled={confirmBtnLoading}
            variant='outline'
            onClick={() => {
              onOpenChange(false);
              setSearchTerm('');
              setExpandedIds(new Set());
              setSelectedIds(new Set());
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={selectedIds.size === 0 || confirmBtnLoading}
          >
            {confirmBtnLoading ? (
              <span className='inline-flex items-center'>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Confirming...
              </span>
            ) : (
              `Confirm${selectedIds.size > 0 ? ` (${selectedIds.size})` : ''}`
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
