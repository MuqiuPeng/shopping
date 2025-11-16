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
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, X } from 'lucide-react';
import { useProductForm } from '../context/product-form-context';

export default function ProductMetadata() {
  const { form } = useProductForm();
  const { register, setValue, watch } = form;

  const tagIds = watch('tagIds') || [];
  const isFeatured = watch('isFeatured');
  const isNew = watch('isNew');

  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !tagIds.includes(newTag)) {
      setValue('tagIds', [...tagIds, newTag], { shouldDirty: true });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setValue(
      'tagIds',
      tagIds.filter((t: string) => t !== tag),
      { shouldDirty: true }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Metadata</CardTitle>
        <CardDescription>Categories and tags</CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Category - Single select for now */}
        <div className='space-y-2'>
          <Label htmlFor='categoryId' className='text-sm font-medium'>
            Category
          </Label>
          <Input
            id='categoryId'
            {...register('categoryId')}
            placeholder='Enter category ID'
            className='text-sm'
          />
          <p className='text-muted-foreground text-xs'>
            Category ID (will be replaced with select later)
          </p>
        </div>

        {/* Tags */}
        <div className='space-y-3'>
          <Label className='text-sm font-medium'>Tags</Label>
          <div className='flex gap-2'>
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' && (e.preventDefault(), handleAddTag())
              }
              placeholder='Add tag ID'
              className='text-sm'
            />
            <Button
              type='button'
              onClick={handleAddTag}
              size='sm'
              variant='outline'
              className='gap-1'
            >
              <Plus className='h-4 w-4' />
            </Button>
          </div>
          <div className='flex flex-wrap gap-2'>
            {tagIds.map((tag: string) => (
              <Badge key={tag} variant='outline' className='gap-2 pl-2'>
                {tag}
                <button
                  type='button'
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
          <div className='space-y-3'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='isFeatured'
                checked={isFeatured}
                onCheckedChange={(checked) =>
                  setValue('isFeatured', !!checked, { shouldDirty: true })
                }
              />
              <label
                htmlFor='isFeatured'
                className='text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Featured Product
              </label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='isNew'
                checked={isNew}
                onCheckedChange={(checked) =>
                  setValue('isNew', !!checked, { shouldDirty: true })
                }
              />
              <label
                htmlFor='isNew'
                className='text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                New Arrival
              </label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
