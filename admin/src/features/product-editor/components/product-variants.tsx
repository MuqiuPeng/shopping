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
import { Plus, Edit, Trash2, ChevronDown } from 'lucide-react';

interface Variant {
  id: string;
  name: string;
  sku: string;
  barcode: string;
  price: number;
  compareAtPrice: number;
  cost: number;
  inventory: number;
  size?: string;
  color?: string;
  isDefault: boolean;
}

interface ProductVariantsProps {
  onChange?: () => void;
}

export default function ProductVariants({ onChange }: ProductVariantsProps) {
  const [variants, setVariants] = useState<Variant[]>([
    {
      id: '1',
      name: 'Black - Large',
      sku: 'WH-BLACK-L',
      barcode: '123456789012',
      price: 299.99,
      compareAtPrice: 399.99,
      cost: 120,
      inventory: 45,
      color: 'Black',
      size: 'Large',
      isDefault: true
    },
    {
      id: '2',
      name: 'Silver - Medium',
      sku: 'WH-SILVER-M',
      barcode: '123456789013',
      price: 299.99,
      compareAtPrice: 399.99,
      cost: 120,
      inventory: 32,
      color: 'Silver',
      size: 'Medium',
      isDefault: false
    }
  ]);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddVariant = () => {
    const newVariant: Variant = {
      id: Date.now().toString(),
      name: 'New Variant',
      sku: '',
      barcode: '',
      price: 0,
      compareAtPrice: 0,
      cost: 0,
      inventory: 0,
      isDefault: false
    };
    setVariants([...variants, newVariant]);
    setEditingId(newVariant.id);
    onChange?.();
  };

  const handleDeleteVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id));
    onChange?.();
  };

  const handleUpdateVariant = (id: string, field: string, value: any) => {
    setVariants(
      variants.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
    onChange?.();
  };

  const handleSetDefault = (id: string) => {
    setVariants(
      variants.map((v) => ({
        ...v,
        isDefault: v.id === id
      }))
    );
    onChange?.();
  };

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <div>
          <CardTitle>Product Variants</CardTitle>
          <CardDescription>
            SKU, pricing, and inventory management
          </CardDescription>
        </div>
        <Button onClick={handleAddVariant} size='sm' className='gap-2'>
          <Plus className='h-4 w-4' />
          Add Variant
        </Button>
      </CardHeader>
      <CardContent className='space-y-3'>
        {variants.length === 0 ? (
          <div className='text-muted-foreground py-8 text-center'>
            <p>No variants yet. Add one to get started.</p>
          </div>
        ) : (
          <div className='space-y-2'>
            {variants.map((variant) => (
              <div key={variant.id}>
                <button
                  onClick={() =>
                    setExpandedId(expandedId === variant.id ? null : variant.id)
                  }
                  className='border-border hover:bg-muted/50 flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors'
                >
                  <div className='flex flex-1 items-center gap-3'>
                    <ChevronDown
                      className={`text-muted-foreground h-4 w-4 transition-transform ${
                        expandedId === variant.id ? 'rotate-180' : ''
                      }`}
                    />
                    <div>
                      <p className='text-foreground font-medium'>
                        {variant.name}
                      </p>
                      <p className='text-muted-foreground text-sm'>
                        {variant.sku}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='text-foreground font-medium'>
                      ${variant.price.toFixed(2)}
                    </p>
                    <p className='text-muted-foreground text-sm'>
                      {variant.inventory} in stock
                    </p>
                  </div>
                </button>

                {expandedId === variant.id && (
                  <div className='bg-muted/50 border-border mt-2 space-y-4 rounded-lg border border-t-0 p-4'>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <Label className='text-sm'>Name</Label>
                        <Input
                          value={variant.name}
                          onChange={(e) =>
                            handleUpdateVariant(
                              variant.id,
                              'name',
                              e.target.value
                            )
                          }
                          className='mt-1'
                        />
                      </div>
                      <div>
                        <Label className='text-sm'>SKU</Label>
                        <Input
                          value={variant.sku}
                          onChange={(e) =>
                            handleUpdateVariant(
                              variant.id,
                              'sku',
                              e.target.value
                            )
                          }
                          className='mt-1'
                        />
                      </div>
                      <div>
                        <Label className='text-sm'>Price</Label>
                        <Input
                          type='number'
                          step='0.01'
                          value={variant.price}
                          onChange={(e) =>
                            handleUpdateVariant(
                              variant.id,
                              'price',
                              parseFloat(e.target.value)
                            )
                          }
                          className='mt-1'
                        />
                      </div>
                      <div>
                        <Label className='text-sm'>Compare At</Label>
                        <Input
                          type='number'
                          step='0.01'
                          value={variant.compareAtPrice}
                          onChange={(e) =>
                            handleUpdateVariant(
                              variant.id,
                              'compareAtPrice',
                              parseFloat(e.target.value)
                            )
                          }
                          className='mt-1'
                        />
                      </div>
                      <div>
                        <Label className='text-sm'>Cost</Label>
                        <Input
                          type='number'
                          step='0.01'
                          value={variant.cost}
                          onChange={(e) =>
                            handleUpdateVariant(
                              variant.id,
                              'cost',
                              parseFloat(e.target.value)
                            )
                          }
                          className='mt-1'
                        />
                      </div>
                      <div>
                        <Label className='text-sm'>Inventory</Label>
                        <Input
                          type='number'
                          value={variant.inventory}
                          onChange={(e) =>
                            handleUpdateVariant(
                              variant.id,
                              'inventory',
                              parseInt(e.target.value)
                            )
                          }
                          className='mt-1'
                        />
                      </div>
                    </div>

                    <div className='flex gap-2 pt-2'>
                      <Button
                        size='sm'
                        variant={variant.isDefault ? 'default' : 'outline'}
                        onClick={() => handleSetDefault(variant.id)}
                      >
                        {variant.isDefault ? '✓ Default' : 'Set as Default'}
                      </Button>
                      <Button
                        size='sm'
                        variant='destructive'
                        onClick={() => handleDeleteVariant(variant.id)}
                        className='ml-auto gap-2'
                      >
                        <Trash2 className='h-4 w-4' />
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
