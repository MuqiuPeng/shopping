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
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface ProductMetadataProps {
  onChange?: () => void;
}

export default function ProductMetadata({ onChange }: ProductMetadataProps) {
  const [categories, setCategories] = useState<string[]>([
    'Electronics',
    'Audio'
  ]);
  const [tags, setTags] = useState<string[]>([
    'headphones',
    'wireless',
    'premium'
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [newTag, setNewTag] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
      onChange?.();
    }
  };

  const handleRemoveCategory = (cat: string) => {
    setCategories(categories.filter((c) => c !== cat));
    onChange?.();
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
      onChange?.();
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
    onChange?.();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Metadata</CardTitle>
        <CardDescription>Categories and tags</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Categories */}
        <div className='space-y-3'>
          <Label className='text-sm font-medium'>Categories</Label>
          <div className='flex gap-2'>
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
              placeholder='Add category'
              className='text-sm'
            />
            <Button
              onClick={handleAddCategory}
              size='sm'
              variant='outline'
              className='gap-1'
            >
              <Plus className='h-4 w-4' />
            </Button>
          </div>
          <div className='flex flex-wrap gap-2'>
            {categories.map((cat) => (
              <Badge key={cat} variant='secondary' className='gap-2 pl-2'>
                {cat}
                <button
                  onClick={() => handleRemoveCategory(cat)}
                  className='hover:text-destructive'
                >
                  <X className='h-3 w-3' />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className='space-y-3'>
          <Label className='text-sm font-medium'>Tags</Label>
          <div className='flex gap-2'>
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              placeholder='Add tag'
              className='text-sm'
            />
            <Button
              onClick={handleAddTag}
              size='sm'
              variant='outline'
              className='gap-1'
            >
              <Plus className='h-4 w-4' />
            </Button>
          </div>
          <div className='flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <Badge key={tag} variant='outline' className='gap-2 pl-2'>
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className='hover:text-destructive'
                >
                  <X className='h-3 w-3' />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        {/* Flags */}
        <div className='space-y-3'>
          <Label className='text-sm font-medium'>Product Flags</Label>
          <div className='space-y-2'>
            <label className='flex cursor-pointer items-center gap-3'>
              <input
                type='checkbox'
                defaultChecked
                className='h-4 w-4 rounded'
              />
              <span className='text-sm'>Featured Product</span>
            </label>
            <label className='flex cursor-pointer items-center gap-3'>
              <input
                type='checkbox'
                defaultChecked
                className='h-4 w-4 rounded'
              />
              <span className='text-sm'>New Arrival</span>
            </label>
            <label className='flex cursor-pointer items-center gap-3'>
              <input type='checkbox' className='h-4 w-4 rounded' />
              <span className='text-sm'>On Sale</span>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
