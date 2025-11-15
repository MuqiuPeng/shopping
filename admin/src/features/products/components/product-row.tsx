'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Edit, Eye, Copy, Trash2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: string;
  visibility: string;
  image: string;
  variants: number;
  sales: number;
  updated: string;
}

interface ProductRowProps {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
}

export function ProductRow({ product, isSelected, onSelect }: ProductRowProps) {
  return (
    <tr className='hover:bg-muted transition-colors'>
      <td className='w-12 px-4 py-3'>
        <Checkbox checked={isSelected} onChange={onSelect} />
      </td>
      <td className='px-4 py-3'>
        <div className='flex items-center gap-3'>
          <img
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            className='bg-muted h-10 w-10 rounded-lg object-cover'
          />
          <div>
            <p className='text-sm font-medium'>{product.name}</p>
            <p className='text-muted-foreground text-xs'>
              {product.variants} variant{product.variants !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </td>
      <td className='px-4 py-3 text-sm font-medium'>
        ${product.price.toFixed(2)}
      </td>
      <td className='px-4 py-3'>
        <div className='flex items-center gap-2'>
          <div
            className={`h-2 w-2 rounded-full ${
              product.stock === 0
                ? 'bg-red-500'
                : product.stock < 10
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
            }`}
          />
          <span className='text-sm'>
            {product.stock} {product.stock === 1 ? 'item' : 'items'}
          </span>
        </div>
      </td>
      <td className='px-4 py-3'>
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getStatusStyles(product.status)}`}
        >
          {getStatusLabel(product.status)}
        </span>
      </td>
      <td className='px-4 py-3'>
        <span
          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getVisibilityStyles(product.visibility)}`}
        >
          {product.visibility === 'published' ? 'Published' : 'Unpublished'}
        </span>
      </td>
      <td className='px-4 py-3 text-sm font-medium'>{product.sales}</td>
      <td className='text-muted-foreground px-4 py-3 text-sm'>
        {product.updated}
      </td>
      <td className='px-4 py-3 text-right'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='sm' className='h-8 w-8 p-0'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>
              <Edit className='mr-2 h-4 w-4' />
              Edit Product
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Eye className='mr-2 h-4 w-4' />
              Preview
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className='mr-2 h-4 w-4' />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem className='text-destructive'>
              <Trash2 className='mr-2 h-4 w-4' />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    active: 'Active',
    draft: 'Draft',
    out_of_stock: 'Out of Stock'
  };
  return labels[status] || status;
}

function getStatusStyles(status: string) {
  const styles: Record<string, string> = {
    active:
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    draft: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
    out_of_stock: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
  };
  return styles[status] || 'bg-gray-100 text-gray-800';
}

function getVisibilityStyles(visibility: string) {
  return visibility === 'published'
    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
}
