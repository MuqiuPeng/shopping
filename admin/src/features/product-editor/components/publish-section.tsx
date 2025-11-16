'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Calendar, Globe } from 'lucide-react';
import { useProductForm } from '../context/product-form-context';
import { ProductStatus } from '@prisma/client';

export default function PublishSection() {
  const { form } = useProductForm();
  const { setValue, watch } = form;

  const status = watch('status');
  const isActive = watch('isActive');

  const statusConfig = {
    [ProductStatus.DRAFT]: {
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
      label: 'Draft'
    },
    [ProductStatus.ACTIVE]: {
      color:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      label: 'Active'
    },
    [ProductStatus.ARCHIVED]: {
      color:
        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      label: 'Archived'
    }
  };

  const handleStatusChange = (newStatus: ProductStatus) => {
    setValue('status', newStatus, { shouldDirty: true });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publish</CardTitle>
        <CardDescription>Visibility and status</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <p className='mb-3 text-sm font-medium'>Status</p>
          <Badge className={`${statusConfig[status].color} mb-4`}>
            {statusConfig[status].label}
          </Badge>
        </div>

        <div className='space-y-2'>
          {(
            [
              ProductStatus.DRAFT,
              ProductStatus.ACTIVE,
              ProductStatus.ARCHIVED
            ] as const
          ).map((s) => (
            <button
              key={s}
              type='button'
              onClick={() => handleStatusChange(s)}
              className={`w-full rounded-lg border px-3 py-2 text-left transition-colors ${
                status === s
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-muted'
              }`}
            >
              <p className='text-sm font-medium'>{statusConfig[s].label}</p>
            </button>
          ))}
        </div>

        <div className='space-y-3 border-t pt-4'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='isActive'
              checked={isActive}
              onCheckedChange={(checked) =>
                setValue('isActive', !!checked, { shouldDirty: true })
              }
            />
            <Label
              htmlFor='isActive'
              className='text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Active Product
            </Label>
          </div>
        </div>

        <div className='pt-2'>
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='w-full gap-2'
          >
            <Globe className='h-4 w-4' />
            View Live
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
