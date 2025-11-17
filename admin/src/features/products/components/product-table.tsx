'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ProductRow } from './product-row';
import Image from 'next/image';

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

interface ProductTableProps {
  products: Product[];
  selectedProducts: Set<string>;
  onSelectAll: () => void;
  refetchProducts: () => void;
  onSelectProduct: (id: string) => void;
  isAllSelected: boolean;
}

export function ProductTable({
  products,
  selectedProducts,
  onSelectAll,
  refetchProducts,
  onSelectProduct,
  isAllSelected
}: ProductTableProps) {
  return (
    <div className='overflow-x-auto'>
      {/* Desktop table */}
      <div className='hidden md:block'>
        <table className='w-full'>
          <thead className='bg-muted border-border border-b'>
            <tr>
              <th className='w-12 px-4 py-3 text-left'>
                <Checkbox
                  checked={isAllSelected}
                  onChange={onSelectAll}
                  aria-label='Select all products'
                />
              </th>
              <th className='text-muted-foreground px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase'>
                Product
              </th>
              <th className='text-muted-foreground px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase'>
                Price
              </th>
              <th className='text-muted-foreground px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase'>
                Stock
              </th>
              <th className='text-muted-foreground px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase'>
                Status
              </th>
              <th className='text-muted-foreground px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase'>
                Visibility
              </th>
              <th className='text-muted-foreground px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase'>
                Sales
              </th>
              <th className='text-muted-foreground px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase'>
                Updated
              </th>
              <th className='text-muted-foreground px-4 py-3 text-right text-xs font-semibold tracking-wider uppercase'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-border divide-y'>
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                isSelected={selectedProducts.has(product.id)}
                onSelect={() => onSelectProduct(product.id)}
                refetchProducts={refetchProducts}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className='space-y-3 p-4 md:hidden'>
        {products.map((product) => (
          <div
            key={product.id}
            className='bg-card border-border space-y-3 rounded-lg border p-4'
          >
            <div className='flex gap-3'>
              <Checkbox
                checked={selectedProducts.has(product.id)}
                onChange={() => onSelectProduct(product.id)}
              />
              <img
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                className='bg-muted h-10 w-10 rounded-lg object-cover'
              />
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium'>{product.name}</p>
                <p className='text-muted-foreground text-xs'>
                  {product.variants} variant{product.variants !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-2 text-sm'>
              <div>
                <p className='text-muted-foreground text-xs'>Price</p>
                <p className='font-semibold'>${product.price.toFixed(2)}</p>
              </div>
              <div>
                <p className='text-muted-foreground text-xs'>Stock</p>
                <p
                  className={`font-semibold ${product.stock === 0 ? 'text-destructive' : product.stock < 10 ? 'text-yellow-600 dark:text-yellow-500' : 'text-green-600 dark:text-green-500'}`}
                >
                  {product.stock} in stock
                </p>
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex gap-2'>
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getStatusStyles(product.status)}`}
                >
                  {getStatusLabel(product.status)}
                </span>
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getVisibilityStyles(product.visibility)}`}
                >
                  {product.visibility === 'published' ? 'Published' : 'Hidden'}
                </span>
              </div>
              <button className='text-primary hover:bg-muted rounded px-2 py-1 text-xs font-medium transition-colors'>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
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
