import React from 'react';
import ProductEditor from '../components/product-editor';

interface ProduceEditorViewProps {
  productId: string;
}

export const ProduceEditorView = (prop: ProduceEditorViewProps) => {
  return <ProductEditor productId={prop.productId} />;
};
