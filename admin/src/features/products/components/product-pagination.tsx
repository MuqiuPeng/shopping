'use client';

import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export function ProductPagination({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange
}: ProductPaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className='border-border bg-card flex flex-col gap-4 border-t p-4 sm:flex-row sm:items-center sm:justify-between lg:p-6'>
      {/* Items per page selector */}
      <div className='flex items-center gap-2'>
        <label
          htmlFor='items-per-page'
          className='text-muted-foreground text-sm'
        >
          Items per page:
        </label>
        <select
          id='items-per-page'
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className='bg-muted border-border hover:border-primary rounded border px-2 py-1 text-sm transition-colors outline-none'
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Results info */}
      <p className='text-muted-foreground text-sm'>
        Showing{' '}
        <span className='text-foreground font-semibold'>{startItem}</span> to{' '}
        <span className='text-foreground font-semibold'>{endItem}</span> of{' '}
        <span className='text-foreground font-semibold'>{totalItems}</span>{' '}
        results
      </p>

      {/* Pagination controls */}
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className='h-8 w-8 p-0'
        >
          <ChevronsLeft className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className='h-8 w-8 p-0'
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>

        <div className='flex items-center gap-1'>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum = i + 1;
            if (totalPages > 5) {
              if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
            }
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? 'default' : 'outline'}
                size='sm'
                onClick={() => onPageChange(pageNum)}
                className='h-8 w-8 p-0 text-xs'
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className='h-8 w-8 p-0'
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className='h-8 w-8 p-0'
        >
          <ChevronsRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
