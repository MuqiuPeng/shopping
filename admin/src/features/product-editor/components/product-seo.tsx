'use client';

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
import { useProductForm } from '../context/product-form-context';

export default function ProductSEO() {
  const { form } = useProductForm();
  const { register, watch } = form;

  const metaTitle = watch('metaTitle') || '';
  const metaDescription = watch('metaDescription') || '';

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
            {...register('metaTitle')}
            maxLength={60}
            className='text-base'
            placeholder='Enter meta title for SEO'
          />
          <div className='flex items-center justify-between'>
            <p className='text-muted-foreground text-xs'>
              Recommended: 50-60 characters
            </p>
            <span className='text-muted-foreground text-xs font-medium'>
              {metaTitle.length}/60
            </span>
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='metaDescription' className='text-sm font-medium'>
            Meta Description
          </Label>
          <Textarea
            id='metaDescription'
            {...register('metaDescription')}
            maxLength={160}
            rows={3}
            className='resize-none text-base'
            placeholder='Enter meta description for SEO'
          />
          <div className='flex items-center justify-between'>
            <p className='text-muted-foreground text-xs'>
              Recommended: 150-160 characters
            </p>
            <span className='text-muted-foreground text-xs font-medium'>
              {metaDescription.length}/160
            </span>
          </div>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='metaKeywords' className='text-sm font-medium'>
            Meta Keywords
          </Label>
          <Input
            id='metaKeywords'
            {...register('metaKeywords')}
            className='text-base'
            placeholder='keyword1, keyword2, keyword3'
          />
          <p className='text-muted-foreground text-xs'>
            Comma-separated keywords
          </p>
        </div>

        {metaTitle && metaDescription && (
          <div className='rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950'>
            <p className='mb-2 text-xs font-semibold text-blue-900 dark:text-blue-100'>
              Preview
            </p>
            <div className='space-y-1'>
              <p className='line-clamp-1 text-sm font-medium text-blue-900 dark:text-blue-100'>
                {metaTitle}
              </p>
              <p className='text-xs text-blue-800 dark:text-blue-200'>
                example.com › product
              </p>
              <p className='line-clamp-2 text-xs text-blue-700 dark:text-blue-300'>
                {metaDescription}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
