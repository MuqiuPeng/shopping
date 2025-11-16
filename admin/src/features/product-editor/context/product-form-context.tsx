'use client';

import { createContext, useContext } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ProductFormData } from '../schemas/product-schema';

interface ProductFormContextValue {
  form: UseFormReturn<ProductFormData>;
  isSubmitting: boolean;
  isDirty: boolean;
}

const ProductFormContext = createContext<ProductFormContextValue | null>(null);

export function ProductFormProvider({
  children,
  value
}: {
  children: React.ReactNode;
  value: ProductFormContextValue;
}) {
  return (
    <ProductFormContext.Provider value={value}>
      {children}
    </ProductFormContext.Provider>
  );
}

export function useProductForm() {
  const context = useContext(ProductFormContext);
  if (!context) {
    throw new Error('useProductForm must be used within ProductFormProvider');
  }
  return context;
}
