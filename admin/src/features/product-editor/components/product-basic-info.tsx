'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useProductForm } from '../context/product-form-context';
import RichTextEditor from '@/components/rich-text-editor';
import { toStringOrEmpty } from '@/utils';

export default function ProductBasicInfo() {
  const { form } = useProductForm();
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = form;

  const name = watch('name');
  const description = watch('description');

  const generateSlug = () => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setValue('slug', slug, { shouldDirty: true });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Information</CardTitle>
        <CardDescription>Basic details about your product</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-2'>
          <Label htmlFor='name' className='text-sm font-medium'>
            Product Name *
          </Label>
          <Input
            id='name'
            {...register('name')}
            placeholder='Enter product name'
            className='text-base'
          />
          {errors.name && (
            <p className='text-destructive text-sm'>{errors.name.message}</p>
          )}
          <p className='text-muted-foreground text-xs'>
            Give your product a clear, descriptive name
          </p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='slug' className='text-sm font-medium'>
            Slug *
          </Label>
          <div className='flex gap-2'>
            <Input
              id='slug'
              {...register('slug')}
              placeholder='product-slug'
              className='flex-1 text-base'
            />
            <button
              type='button'
              onClick={generateSlug}
              className='text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors'
            >
              Generate
            </button>
          </div>
          {errors.slug && (
            <p className='text-destructive text-sm'>{errors.slug.message}</p>
          )}
          <p className='text-muted-foreground text-xs'>
            URL-friendly unique identifier
          </p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='description'>Description</Label>

          <RichTextEditor
            value={toStringOrEmpty(description)}
            onChange={(value: string) =>
              setValue('description', value, { shouldDirty: true })
            }
            placeholder='Describe your product in detail...'
          />
          {errors.description && (
            <p className='text-destructive text-sm'>
              {errors.description.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
