import { z } from 'zod';
import { ProductStatus } from '@prisma/client';

// Variant schema - 完全匹配 Prisma schema
const variantSchema = z.object({
  id: z.string().optional(),
  productId: z.string().optional(), // 会自动填充
  sku: z.string().min(1, 'SKU is required'),
  barcode: z.string().optional().nullable(),
  name: z.string().optional().nullable(), // 变体名称，如 "大号-红色"
  price: z.number().min(0, 'Price must be positive'),
  compareAtPrice: z.number().optional().nullable(),
  cost: z.number().optional().nullable(),
  inventory: z.number().int().min(0).default(0),
  lowStockThreshold: z.number().int().default(5),
  trackInventory: z.boolean().default(true),
  // 变体属性
  size: z.string().optional().nullable(), // S/M/L/XL 或具体尺寸
  color: z.string().optional().nullable(), // 颜色
  material: z.string().optional().nullable(), // 材质(手链场景:和田玉、翡翠等)
  weight: z.number().optional().nullable(), // 重量
  // 其他属性可用 JSON 存储
  attributes: z.any().optional().nullable(), // {bead_diameter: 8, length: 18, ...}
  isDefault: z.boolean().default(false), // 是否为默认变体
  sortOrder: z.number().int().default(0),
  isActive: z.boolean().default(true),
  // 统计字段 (只读，不需要在表单中编辑)
  salesCount: z.number().int().default(0).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  // Relations (可选，用于显示数据)
  variant_images: z.array(z.any()).optional()
});

// Image schema
const imageSchema = z.object({
  id: z.string().optional(),
  url: z.string().min(1, 'Image URL is required'), // Changed from .url() to accept any non-empty string
  altText: z.string().optional().nullable(),
  sortOrder: z.number().int().default(0)
});

// FAQ schema
const faqSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0)
});

// Main product schema - 匹配 Prisma products model
export const productFormSchema = z.object({
  // Basic Info
  name: z.string().min(1, 'Product name is required').max(200),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional().nullable(),
  shortDescription: z.string().max(500).optional().nullable(), // 前端用，数据库没有此字段

  // Category & Brand
  categoryId: z.string().optional().nullable(),
  brandId: z.string().optional().nullable(), // 数据库目前没有 brand 字段

  // Status
  status: z.nativeEnum(ProductStatus).default(ProductStatus.DRAFT),
  publishedAt: z.date().optional().nullable(), // 发布时间
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isNew: z.boolean().default(false),

  // Media
  thumbnail: z.string().optional().nullable().or(z.literal('')), // 产品封面图/缩略图
  videoUrl: z.string().optional().nullable().or(z.literal('')), // 数据库没有此字段
  product_images: z.array(imageSchema).default([]),

  // Variants
  variants: z.array(variantSchema).default([]),

  // SEO
  metaTitle: z.string().max(60).optional().nullable(),
  metaDescription: z.string().max(160).optional().nullable(),
  metaKeywords: z.string().optional().nullable(), // 数据库没有此字段

  // FAQs
  product_faqs: z.array(faqSchema).default([]),

  // Tags
  tagIds: z.array(z.string()).default([]),

  // 统计字段 (只读，不在表单中编辑)
  viewCount: z.number().int().default(0).optional(),
  salesCount: z.number().int().default(0).optional(),
  reviewCount: z.number().int().default(0).optional(),
  avgRating: z.number().optional().nullable(),
  wishlistCount: z.number().int().default(0).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export type ProductFormData = z.infer<typeof productFormSchema>;
