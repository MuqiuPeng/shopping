'use client';

import { PackageX, ArrowLeft, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ProductNotFoundProps {
  productId?: string;
}

const ProductNotFound = ({ productId }: ProductNotFoundProps) => {
  return (
    <div className='flex min-h-[calc(100vh-200px)] w-full items-center justify-center p-6'>
      <div className='w-full max-w-2xl'>
        {/* Animated Icon Container */}
        <div className='mb-8 flex justify-center'>
          <div className='bg-muted/50 relative rounded-full p-8'>
            {/* Pulsing background effect */}
            <div className='bg-primary/5 absolute inset-0 animate-pulse rounded-full' />
            <div className='bg-muted relative rounded-full p-6'>
              <PackageX
                className='text-muted-foreground h-16 w-16'
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='text-center'>
          <h1 className='text-foreground mb-3 text-3xl font-semibold tracking-tight'>
            Product Not Found
          </h1>
          <p className='text-muted-foreground mb-2 text-base'>
            {productId ? (
              <>
                The product with ID{' '}
                <code className='bg-muted text-foreground rounded px-2 py-1 font-mono text-sm'>
                  {productId}
                </code>{' '}
                doesn&apos;t exist or has been removed.
              </>
            ) : (
              "The product you're looking for doesn't exist or has been removed."
            )}
          </p>
          <p className='text-muted-foreground mb-8 text-sm'>
            Please check the URL or return to the product list.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductNotFound;
