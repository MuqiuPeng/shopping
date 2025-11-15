'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ProductSEOProps {
  onChange?: () => void;
}

export default function ProductSEO({ onChange }: ProductSEOProps) {
  const [seo, setSeo] = useState({
    metaTitle: 'Premium Wireless Headphones - High-Quality Sound',
    metaDescription:
      'Discover our premium wireless headphones with noise cancellation and 30-hour battery life. Shop now for the best audio experience.'
  });

  const handleChange = (field: string, value: string) => {
    setSeo((prev) => ({ ...prev, [field]: value }));
    onChange?.();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
        <CardDescription>Optimize for search engines</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-2'>
          <Label htmlFor='metaTitle' className='text-sm font-medium'>
            Meta Title
          </Label>
          <Input
            id='metaTitle'
            value={seo.metaTitle}
            onChange={(e) => handleChange('metaTitle', e.target.value)}
            maxLength={60}
            className='text-base'
          />
          <div className='flex items-center justify-between'>
            <p className='text-muted-foreground text-xs'>
              Recommended: 50-60 characters
            </p>
            <span className='text-muted-foreground text-xs font-medium'>
              {seo.metaTitle.length}/60
            </span>
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='metaDescription' className='text-sm font-medium'>
            Meta Description
          </Label>
          <Textarea
            id='metaDescription'
            value={seo.metaDescription}
            onChange={(e) => handleChange('metaDescription', e.target.value)}
            maxLength={160}
            rows={3}
            className='resize-none text-base'
          />
          <div className='flex items-center justify-between'>
            <p className='text-muted-foreground text-xs'>
              Recommended: 150-160 characters
            </p>
            <span className='text-muted-foreground text-xs font-medium'>
              {seo.metaDescription.length}/160
            </span>
          </div>
        </div>

        <div className='rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950'>
          <p className='mb-2 text-xs font-semibold text-blue-900 dark:text-blue-100'>
            Preview
          </p>
          <div className='space-y-1'>
            <p className='line-clamp-1 text-sm font-medium text-blue-900 dark:text-blue-100'>
              {seo.metaTitle}
            </p>
            <p className='text-xs text-blue-800 dark:text-blue-200'>
              example.com › product
            </p>
            <p className='line-clamp-2 text-xs text-blue-700 dark:text-blue-300'>
              {seo.metaDescription}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
