'use client';

import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useConfirmDialog } from '@/components/confirm-dialog-provider';
import { useProductForm } from '../context/product-form-context';

export default function ProductImagesExample() {
  const { confirm } = useConfirmDialog();
  const { form } = useProductForm();
  const { watch, setValue } = form;

  const productImages = watch('product_images') || [];

  const handleRemoveImage = (id: string) => {
    confirm(
      async () => {
        // 执行删除操作
        const updatedImages = productImages.filter((img) => img.id !== id);
        setValue('product_images', updatedImages, { shouldDirty: true });

        toast.success('Image deleted successfully', {
          style: {
            background: 'var(--primary)',
            color: 'var(--primary-foreground)',
            border: '1px solid var(--primary)'
          }
        });
      },
      {
        title: 'Delete Image?',
        description:
          'Are you sure you want to delete this image? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        variant: 'destructive'
      }
    );
  };

  return (
    <div>
      {productImages.map((image) => (
        <div key={image.id}>
          <img src={image.url} alt={image.altText || ''} />
          <Button
            variant='ghost'
            size='icon'
            onClick={() => handleRemoveImage(image.id!)}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
      ))}
    </div>
  );
}
