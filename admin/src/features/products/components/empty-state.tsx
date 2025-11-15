'use client';

import { Plus, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EmptyState() {
  return (
    <div className='flex min-h-[400px] items-center justify-center p-4'>
      <div className='max-w-md text-center'>
        <div className='mb-4 flex justify-center'>
          <div className='bg-muted flex h-16 w-16 items-center justify-center rounded-full'>
            <Package className='text-muted-foreground h-8 w-8' />
          </div>
        </div>
        <h3 className='mb-2 text-lg font-semibold'>No products found</h3>
        <p className='text-muted-foreground mb-6 text-sm'>
          Start selling by adding your first product to your store.
        </p>
        <Button className='gap-2'>
          <Plus className='h-4 w-4' />
          <span>Add Your First Product</span>
        </Button>
      </div>
    </div>
  );
}
