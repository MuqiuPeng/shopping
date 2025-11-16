'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, GripVertical, Star } from 'lucide-react';

interface ProductImage {
  id: string;
  url: string;
  altText: string;
  sortOrder: number;
  isCover?: boolean;
}

interface ProductImagesProps {
  onChange?: () => void;
}

export default function ProductImages({ onChange }: ProductImagesProps) {
  const [images, setImages] = useState<ProductImage[]>([
    {
      id: '1',
      url: '/premium-headphones.jpg',
      altText: 'Premium headphones front view',
      sortOrder: 0,
      isCover: true
    },
    {
      id: '2',
      url: '/headphones-side.jpg',
      altText: 'Headphones side view',
      sortOrder: 1,
      isCover: false
    }
  ]);

  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleImageUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const newImage: ProductImage = {
      id: Date.now().toString(),
      url: '/generic-product-display.png',
      altText: '',
      sortOrder: images.length,
      isCover: false
    };
    setImages([...images, newImage]);
    onChange?.();
  };

  const handleAltTextChange = (id: string, altText: string) => {
    setImages(images.map((img) => (img.id === id ? { ...img, altText } : img)));
    onChange?.();
  };

  const handleRemoveImage = (id: string) => {
    setImages(images.filter((img) => img.id !== id));
    onChange?.();
  };

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return;

    const draggedIndex = images.findIndex((img) => img.id === draggedId);
    const targetIndex = images.findIndex((img) => img.id === targetId);

    const newImages = [...images];
    const [removed] = newImages.splice(draggedIndex, 1);
    newImages.splice(targetIndex, 0, removed);
    newImages.forEach((img, i) => (img.sortOrder = i));

    setImages(newImages);
    setDraggedId(null);
    onChange?.();
  };

  const handleSetCoverImage = (id: string) => {
    setImages(
      images.map((img) => ({
        ...img,
        isCover: img.id === id
      }))
    );
    onChange?.();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>
          Manage product photos, set cover image, and arrange order
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Button
          onClick={handleImageUpload}
          variant='outline'
          className='w-full gap-2'
        >
          <Upload className='h-4 w-4' />
          Add Image
        </Button>

        <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
          {images.map((image, index) => (
            <div
              key={image.id}
              draggable
              onDragStart={() => handleDragStart(image.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(image.id)}
              className='group bg-muted relative cursor-grab overflow-hidden rounded-lg transition-all hover:shadow-md active:cursor-grabbing'
            >
              {image.isCover && (
                <div className='absolute top-2 left-2 z-10 flex items-center gap-1 rounded-md bg-amber-500 px-2 py-1 text-white'>
                  <Star className='h-3 w-3 fill-current' />
                  <span className='text-xs font-semibold'>Cover</span>
                </div>
              )}

              <div className='bg-muted flex aspect-square items-center justify-center overflow-hidden'>
                <img
                  src={image.url || '/placeholder.svg'}
                  alt={image.altText}
                  className='h-full w-full object-cover'
                />
              </div>

              <div className='absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/0 opacity-0 transition-colors group-hover:bg-black/40 group-hover:opacity-100'>
                <GripVertical className='h-4 w-4 text-white' />
                {!image.isCover && (
                  <button
                    onClick={() => handleSetCoverImage(image.id)}
                    className='rounded bg-amber-500 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-amber-600'
                  >
                    Set as Cover
                  </button>
                )}
              </div>

              <button
                onClick={() => handleRemoveImage(image.id)}
                className='bg-destructive hover:bg-destructive/90 absolute top-2 right-2 rounded-md p-1 text-white opacity-0 transition-opacity group-hover:opacity-100'
              >
                <X className='h-4 w-4' />
              </button>

              <div className='absolute right-0 bottom-0 left-0 translate-y-full bg-gradient-to-t from-black/50 to-transparent p-2 transition-transform group-hover:translate-y-0'>
                <p className='text-xs font-medium text-white'>
                  Order: {index + 1}
                </p>
              </div>
            </div>
          ))}
        </div>

        {images.length > 0 && (
          <div className='space-y-4 border-t pt-4'>
            <div>
              <Label className='text-sm font-medium'>Edit Alt Text</Label>
              <div className='mt-2 max-h-64 space-y-2 overflow-y-auto'>
                {images.map((image) => (
                  <div key={image.id} className='flex items-start gap-2'>
                    <div className='relative flex-shrink-0'>
                      <img
                        src={image.url || '/placeholder.svg'}
                        alt={image.altText}
                        className='h-10 w-10 rounded object-cover'
                      />
                      {image.isCover && (
                        <div className='absolute -top-1 -right-1 rounded-full bg-amber-500 p-0.5'>
                          <Star className='h-2.5 w-2.5 fill-white text-white' />
                        </div>
                      )}
                    </div>
                    <Input
                      value={image.altText}
                      onChange={(e) =>
                        handleAltTextChange(image.id, e.target.value)
                      }
                      placeholder='Describe the image...'
                      className='flex-1 text-sm'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
