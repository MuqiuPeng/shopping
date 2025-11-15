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

interface ProductBasicInfoProps {
  onChange?: () => void;
}

export default function ProductBasicInfo({ onChange }: ProductBasicInfoProps) {
  const [formData, setFormData] = useState({
    name: 'Premium Wireless Headphones',
    slug: 'premium-wireless-headphones',
    description:
      'High-quality wireless headphones with noise cancellation and premium sound quality.'
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    onChange?.();
  };

  const generateSlug = (name: string) => {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
    handleChange('slug', slug);
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
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder='Enter product name'
            className='text-base'
          />
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
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              placeholder='product-slug'
              className='flex-1 text-base'
            />
            <button
              onClick={() => generateSlug(formData.name)}
              className='text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors'
            >
              Generate
            </button>
          </div>
          <p className='text-muted-foreground text-xs'>
            URL-friendly unique identifier
          </p>
        </div>

        <div className='space-y-2'>
          <Label htmlFor='description' className='text-sm font-medium'>
            Description
          </Label>
          <Textarea
            id='description'
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder='Describe your product in detail...'
            rows={5}
            className='resize-none text-base'
          />
          <p className='text-muted-foreground text-xs'>
            Rich description helps customers understand your product
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
