'use client';

import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductFiltersProps {
  filters: {
    status: string;
    visibility: string;
    search: string;
  };
  onFiltersChange: (filters: any) => void;
  productCount: number;
}

export function ProductFilters({
  filters,
  onFiltersChange,
  productCount
}: ProductFiltersProps) {
  const hasActiveFilters =
    filters.status !== 'all' ||
    filters.visibility !== 'all' ||
    filters.search !== '';

  return (
    <div className='border-border bg-card border-b'>
      <div className='space-y-4'>
        {/* Search bar */}
        <div className='bg-muted flex items-center gap-2 rounded-lg px-3 py-2'>
          <Search className='text-muted-foreground h-4 w-4 flex-shrink-0' />
          <input
            type='text'
            placeholder='Search by product name or SKU...'
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            className='flex-1 bg-transparent text-sm outline-none'
          />
          {filters.search && (
            <button
              onClick={() => onFiltersChange({ ...filters, search: '' })}
              className='hover:bg-border rounded p-1 transition-colors'
            >
              <X className='h-4 w-4' />
            </button>
          )}
        </div>

        {/* Filter controls */}
        <div className='flex flex-wrap gap-3'>
          <select
            value={filters.status}
            onChange={(e) =>
              onFiltersChange({ ...filters, status: e.target.value })
            }
            className='bg-muted border-border hover:border-primary rounded-lg border px-3 py-2 text-sm transition-colors outline-none'
          >
            <option value='all'>All Statuses</option>
            <option value='active'>Active</option>
            <option value='draft'>Draft</option>
            <option value='out_of_stock'>Out of Stock</option>
          </select>

          <select
            value={filters.visibility}
            onChange={(e) =>
              onFiltersChange({ ...filters, visibility: e.target.value })
            }
            className='bg-muted border-border hover:border-primary rounded-lg border px-3 py-2 text-sm transition-colors outline-none'
          >
            <option value='all'>All Visibility</option>
            <option value='published'>Published</option>
            <option value='unpublished'>Unpublished</option>
          </select>

          {hasActiveFilters && (
            <Button
              variant='ghost'
              size='sm'
              onClick={() =>
                onFiltersChange({
                  status: 'all',
                  visibility: 'all',
                  search: ''
                })
              }
            >
              <X className='mr-1 h-4 w-4' />
              Clear filters
            </Button>
          )}
        </div>

        {/* Results count */}
        <p className='text-muted-foreground text-xs'>
          Showing{' '}
          <span className='text-foreground font-semibold'>{productCount}</span>{' '}
          product
          {productCount !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}
