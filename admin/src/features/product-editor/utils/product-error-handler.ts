export const getErrorMessage = (field: string): string => {
  const fieldNames: Record<string, string> = {
    name: 'Product Name',
    slug: 'Product URL',
    description: 'Description',
    shortDescription: 'Short Description',
    categoryId: 'Category',
    brandId: 'Brand',
    thumbnail: 'Thumbnail Image',
    variants: 'Product Variants',
    metaTitle: 'SEO Title',
    metaDescription: 'SEO Description'
  };
  return fieldNames[field] || field;
};
