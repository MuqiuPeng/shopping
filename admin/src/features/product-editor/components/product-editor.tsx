'use client';

import { useState } from 'react';
import { Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductBasicInfo from './product-basic-info';
import ProductImages from './product-images';
import ProductVariants from './product-variants';
import ProductMetadata from './product-metadata';
import ProductSEO from './product-seo';
import PublishSection from './publish-section';
import ProductNotFound from './product-not-found';
import { useProductData } from '../hooks/use-product-data';

interface ProductEditorProps {
  productId: string;
}

export default function ProductEditor(props: ProductEditorProps) {
  const { productId } = props;

  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const { data, error, isLoading, mutate } = useProductData(productId);
  console.log('data: ', JSON.stringify(data, null, 2));

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setHasChanges(false);
  };

  if (!productId) return <ProductNotFound />;

  return (
    <div className='w-full'>
      {/* Header */}
      <div className='border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur'>
        <div className='flex items-center justify-between px-6 py-4'>
          <div>
            <h1 className='text-foreground text-2xl font-semibold'>
              Product Editor
            </h1>
            <p className='text-muted-foreground mt-1 text-sm'>
              Manage your product details and inventory
            </p>
          </div>
          <div className='flex items-center gap-3'>
            {hasChanges && (
              <span className='text-sm text-amber-600 dark:text-amber-400'>
                Unsaved changes
              </span>
            )}
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className='gap-2'
            >
              <Save className='h-4 w-4' />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-10xl mx-auto grid grid-cols-1 gap-6 p-6 lg:grid-cols-3'>
        {/* Left Column - Main Sections */}
        <div className='space-y-6 lg:col-span-2'>
          <ProductBasicInfo onChange={() => setHasChanges(true)} />
          <ProductImages onChange={() => setHasChanges(true)} />
          <ProductVariants onChange={() => setHasChanges(true)} />
          <ProductSEO onChange={() => setHasChanges(true)} />
        </div>

        {/* Right Column - Sidebar */}
        <div className='space-y-6'>
          <ProductMetadata onChange={() => setHasChanges(true)} />
          <PublishSection onChange={() => setHasChanges(true)} />
        </div>
      </div>
    </div>
  );
}
