import z from 'zod';

const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
  parentId: z.string().nullable().optional(),
  path: z.string().default(''),
  createdAt: z.date(),
  updatedAt: z.date(),
  products: z.array(z.any()).optional()
});

const categoryCreateInputSchema = z.object({
  name: z.string(),
  slug: z.string(),
  parentId: z.string().nullable().default(null),
  description: z.string().nullable()
});

export type categoryType = z.infer<typeof categorySchema>;
export type categoryCreateInputType = z.infer<typeof categoryCreateInputSchema>;
