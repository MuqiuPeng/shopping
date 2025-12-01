import { PrismaClient, ProductStatus } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

// 辅助函数：生成随机数
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 辅助函数：随机选择数组元素
function randomChoice<T>(array: T[]): T {
  return array[randomInt(0, array.length - 1)];
}

// 辅助函数：生成 Decimal
function decimal(value: number): Decimal {
  return new Decimal(value);
}

// Mock 数据
// const categories = [
//   {
//     id: 'cat-1',
//     name: 'Bracelets',
//     slug: 'bracelets',
//     description: 'Various types of bracelets for every style',
//     imageUrl: '/categories/bracelets.jpg',
//     createdAt: new Date(),
//     updatedAt: new Date()
//   },
//   {
//     id: 'cat-2',
//     name: 'Necklaces',
//     slug: 'necklaces',
//     description: 'Elegant necklaces collection',
//     imageUrl: '/categories/necklaces.jpg',
//     createdAt: new Date(),
//     updatedAt: new Date()
//   },
//   {
//     id: 'cat-3',
//     name: 'Rings',
//     slug: 'rings',
//     description: 'Fashionable rings for any occasion',
//     imageUrl: '/categories/rings.jpg',
//     createdAt: new Date(),
//     updatedAt: new Date()
//   },
//   {
//     id: 'cat-4',
//     name: 'Earrings',
//     slug: 'earrings',
//     description: 'Graceful earrings to complete your look',
//     imageUrl: '/categories/earrings.jpg',
//     createdAt: new Date(),
//     updatedAt: new Date()
//   }
// ];
const categories = [
  // 顶级分类
  {
    id: "cat-0",
    name: "Electronics",
    slug: "electronics",
    description: "Electronic devices and accessories",
    imageUrl: "/categories/electronics.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    parentId: null, // Top level
  },

  // 二级分类
  {
    id: "cat-1",
    name: "Computers",
    slug: "computers",
    description: "Desktop and laptop computers",
    imageUrl: "/categories/computers.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    parentId: "cat-0",
  },
  {
    id: "cat-2",
    name: "Mobile Devices",
    slug: "mobile-devices",
    description: "Smartphones and tablets",
    imageUrl: "/categories/mobile-devices.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    parentId: "cat-0",
  },
  {
    id: "cat-3",
    name: "Wearables",
    slug: "wearables",
    description: "Smartwatches and fitness trackers",
    imageUrl: "/categories/wearables.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    parentId: "cat-0",
  },

  // 三级分类：Computers 子分类
  {
    id: "cat-4",
    name: "Laptops",
    slug: "laptops",
    description: "Portable computers",
    imageUrl: "/categories/laptops.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    parentId: "cat-1",
  },
  {
    id: "cat-5",
    name: "Desktops",
    slug: "desktops",
    description: "Personal desktop computers",
    imageUrl: "/categories/desktops.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    parentId: "cat-1",
  },

  // 三级分类：Mobile Devices 子分类
  {
    id: "cat-6",
    name: "Smartphones",
    slug: "smartphones",
    description: "Android and iOS smartphones",
    imageUrl: "/categories/smartphones.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    parentId: "cat-2",
  },
  {
    id: "cat-7",
    name: "Tablets",
    slug: "tablets",
    description: "Tablet devices",
    imageUrl: "/categories/tablets.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    parentId: "cat-2",
  },

  // 三级分类：Wearables 子分类
  {
    id: "cat-8",
    name: "Smartwatches",
    slug: "smartwatches",
    description: "Wearable smartwatches",
    imageUrl: "/categories/smartwatches.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    parentId: "cat-3",
  },
  {
    id: "cat-9",
    name: "Fitness Trackers",
    slug: "fitness-trackers",
    description: "Fitness and health tracking devices",
    imageUrl: "/categories/fitness-trackers.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    parentId: "cat-3",
  },
];

const tags = [
  {
    id: "tag-1",
    name: "New Arrival",
    slug: "new-arrival",
    color: "#10B981",
    description: "Latest products",
  },
  {
    id: "tag-2",
    name: "Best Seller",
    slug: "best-seller",
    color: "#EF4444",
    description: "Top selling items",
  },
  {
    id: "tag-3",
    name: "On Sale",
    slug: "on-sale",
    color: "#F59E0B",
    description: "Special discount",
  },
  {
    id: "tag-4",
    name: "Limited Edition",
    slug: "limited-edition",
    color: "#8B5CF6",
    description: "Limited stock",
  },
  {
    id: "tag-5",
    name: "Handmade",
    slug: "handmade",
    color: "#6366F1",
    description: "Handcrafted items",
  },
  {
    id: "tag-6",
    name: "Natural",
    slug: "natural",
    color: "#14B8A6",
    description: "Natural materials",
  },
  {
    id: "tag-7",
    name: "Gift",
    slug: "gift",
    color: "#EC4899",
    description: "Perfect for gifts",
  },
];

const colors = [
  "White",
  "Green",
  "Red",
  "Blue",
  "Purple",
  "Yellow",
  "Black",
  "Clear",
];
const sizes = ["S", "M", "L", "XL"];

// 产品数据
const products = [
  {
    name: "Hetian Jade Seed Bracelet",
    slug: "hetian-jade-seed-bracelet",
    description:
      "Premium Xinjiang Hetian jade seed bracelet, warm and delicate with excellent oil content. Crafted using traditional techniques, each bead is carefully selected. Perfect for daily wear, showcasing elegance and grace.",
    category: "cat-1",
    materials: ["Jade"],
    tags: ["tag-1", "tag-6", "tag-5"],
  },
  {
    name: "Ice Jade Bracelet",
    slug: "ice-jade-bracelet",
    description:
      "Authentic Myanmar Grade A jade, ice type with excellent transparency and water content. Evenly distributed emerald green color, brightens skin tone when worn. Each piece is certified by national inspection, quality guaranteed.",
    category: "cat-1",
    materials: ["Emerald"],
    tags: ["tag-2", "tag-6"],
  },
  {
    name: "Nanhong Agate Bracelet",
    slug: "nanhong-agate-bracelet",
    description:
      "Yunnan Baoshan Nanhong agate, vibrant red color with fine texture. Traditional Buddhist bead design, suitable for collection and meditation. Develops beautiful patina over time.",
    category: "cat-1",
    materials: ["Agate"],
    tags: ["tag-3", "tag-5"],
  },
  {
    name: "Amethyst Bracelet",
    slug: "amethyst-bracelet",
    description:
      "Natural amethyst with transparent crystals and uniform color. Said to help relieve stress and improve sleep quality. Perfect for women.",
    category: "cat-1",
    materials: ["Crystal"],
    tags: ["tag-6", "tag-7"],
  },
  {
    name: "Rudraksha Mala Bracelet",
    slug: "rudraksha-bracelet",
    description:
      "Nepali Rudraksha with clear patterns and hard texture. Pre-cleaned and ready for wearing. Develops rich red color and beautiful patina with use.",
    category: "cat-1",
    materials: ["Rudraksha"],
    tags: ["tag-4", "tag-5"],
  },
  {
    name: "Amber Beeswax Necklace",
    slug: "amber-beeswax-necklace",
    description:
      "Baltic natural amber beeswax, warm texture with golden yellow color. Comfortable to wear with collectible value. Each piece is unique.",
    category: "cat-2",
    materials: ["Amber"],
    tags: ["tag-1", "tag-6", "tag-7"],
  },
  {
    name: "Freshwater Pearl Necklace",
    slug: "freshwater-pearl-necklace",
    description:
      "Premium freshwater pearls with soft luster and full beads. Classic design suitable for all occasions. Showcases elegant temperament.",
    category: "cat-2",
    materials: ["Pearl"],
    tags: ["tag-2", "tag-7"],
  },
  {
    name: "18K Gold Necklace",
    slug: "18k-gold-necklace",
    description:
      "18K gold material with exquisite craftsmanship, fade-resistant. Simple design, can be worn alone or with pendants. Perfect for gifting or self-purchase.",
    category: "cat-2",
    materials: ["Gold"],
    tags: ["tag-2", "tag-7"],
  },
  {
    name: "925 Silver Ring",
    slug: "925-silver-ring",
    description:
      "Thai silver 925 sterling silver ring, vintage design with fine workmanship. Oxidized finish for unique charm. Adjustable size.",
    category: "cat-3",
    materials: ["Silver"],
    tags: ["tag-3", "tag-5"],
  },
  {
    name: "Hetian Jade Ring",
    slug: "hetian-jade-ring",
    description:
      "Hetian white jade ring, warm jade quality with good oil content. Traditional saddle ring design, comfortable to wear. Suitable for daily use.",
    category: "cat-3",
    materials: ["Jade"],
    tags: ["tag-6"],
  },
];

async function main() {
  console.log("🌱 Starting database cleanup...");

  // 清理现有数据（开发环境专用）
  // await prisma.related_products.deleteMany();
  // await prisma.product_faqs.deleteMany();
  // await prisma.coupon_usages.deleteMany();
  // await prisma.coupons.deleteMany();
  // await prisma.promotion_products.deleteMany();
  // await prisma.promotions.deleteMany();
  // await prisma.product_tags.deleteMany();
  // await prisma.tags.deleteMany();
  // await prisma.variant_images.deleteMany();
  // await prisma.product_images.deleteMany();
  // await prisma.wishlist_items.deleteMany();
  // await prisma.reviews.deleteMany();
  // await prisma.cart_items.deleteMany();
  // await prisma.order_items.deleteMany();
  // await prisma.orders.deleteMany();
  // await prisma.product_variants.deleteMany();
  // await prisma.products.deleteMany();
  await prisma.categories.deleteMany();

  console.log("✅ Database cleanup completed");
  console.log("");

  // 1. 创建分类
  console.log("📁 Creating categories...");
  for (const cat of categories) {
    await prisma.categories.create({ data: cat });
  }
  console.log(`✅ Created ${categories.length} categories`);
  console.log("");

  // 2. 创建标签
  // console.log('🏷️  Creating tags...');
  // for (const tag of tags) {
  //   await prisma.tags.create({ data: tag });
  // }
  // console.log(`✅ Created ${tags.length} tags`);
  // console.log('');

  // 3. 创建产品及其变体
  // console.log('🛍️  Creating products...');
  // let productCount = 0;
  // let variantCount = 0;

  // for (const product of products) {
  //   const createdProduct = await prisma.products.create({
  //     data: {
  //       id: `prod-${productCount + 1}`,
  //       name: product.name,
  //       slug: product.slug,
  //       description: product.description,
  //       thumbnail: `/products/${product.slug}/thumbnail.jpg`,
  //       categoryId: product.category,
  //       status: ProductStatus.ACTIVE,
  //       publishedAt: new Date(),
  //       isActive: true,
  //       isFeatured: randomInt(0, 1) === 1,
  //       isNew: randomInt(0, 2) === 1,
  //       metaTitle: `${product.name} - Premium Jewelry Online`,
  //       metaDescription: product.description.substring(0, 160),
  //       viewCount: randomInt(100, 5000),
  //       salesCount: randomInt(10, 500),
  //       reviewCount: randomInt(0, 100),
  //       avgRating: decimal(randomInt(35, 50) / 10), // 3.5 - 5.0
  //       wishlistCount: randomInt(5, 200)
  //     }
  //   });

  //   // 为每个产品创建 2-4 个变体
  //   const variantNumber = randomInt(2, 4);
  //   for (let i = 0; i < variantNumber; i++) {
  //     const material = randomChoice(product.materials);
  //     const size = randomChoice(sizes);
  //     const color = randomChoice(colors);
  //     const basePrice = randomInt(200, 2000);
  //     const sizeMultiplier = { S: 0.9, M: 1.0, L: 1.1, XL: 1.2 }[size] || 1;
  //     const price = Math.round(basePrice * sizeMultiplier);

  //     await prisma.product_variants.create({
  //       data: {
  //         id: `var-${variantCount + 1}`,
  //         productId: createdProduct.id,
  //         sku: `${product.slug}-${material}-${size}-${i + 1}`.toUpperCase(),
  //         barcode: `${randomInt(1000000000, 9999999999)}`,
  //         name: `${size} - ${color}`,
  //         price: decimal(price),
  //         compareAtPrice: decimal(Math.round(price * 1.2)), // 原价高20%
  //         cost: decimal(Math.round(price * 0.6)), // 成本价
  //         inventory: randomInt(10, 200),
  //         lowStockThreshold: 10,
  //         trackInventory: true,
  //         size,
  //         color,
  //         material,
  //         weight: randomInt(10, 100) / 10, // 1-10g
  //         attributes: {
  //           bead_diameter_mm: randomInt(6, 12),
  //           length_cm: randomInt(16, 22),
  //           quality: randomChoice(['Grade A', 'Grade AA', 'Grade AAA'])
  //         },
  //         isDefault: i === 0,
  //         sortOrder: i,
  //         isActive: true,
  //         salesCount: randomInt(5, 100)
  //       }
  //     });
  //     variantCount++;
  //   }

  //   // 创建产品图片
  //   for (let i = 0; i < randomInt(3, 6); i++) {
  //     await prisma.product_images.create({
  //       data: {
  //         id: `img-${createdProduct.id}-${i + 1}`,
  //         productId: createdProduct.id,
  //         url: `/products/${product.slug}/image-${i + 1}.jpg`,
  //         altText: `${product.name} - Image ${i + 1}`,
  //         sortOrder: i
  //       }
  //     });
  //   }

  //   // 关联标签
  //   for (const tagId of product.tags) {
  //     await prisma.product_tags.create({
  //       data: {
  //         productId: createdProduct.id,
  //         tagId
  //       }
  //     });
  //   }

  //   // 添加产品 FAQ
  //   await prisma.product_faqs.createMany({
  //     data: [
  //       {
  //         productId: createdProduct.id,
  //         question: 'Is this product authentic?',
  //         answer:
  //           'All our products are certified by national authorities and guaranteed 100% authentic. Certificate provided.',
  //         sortOrder: 1
  //       },
  //       {
  //         productId: createdProduct.id,
  //         question: 'What is your return policy?',
  //         answer:
  //           'We offer a 7-day return policy. If you receive a defective product, please contact customer service immediately.',
  //         sortOrder: 2
  //       }
  //     ]
  //   });

  //   productCount++;
  //   console.log(`  ✓ ${product.name} (${variantNumber} variants)`);
  // }

  // console.log(`✅ Created ${productCount} products, ${variantCount} variants`);
  // console.log('');

  // 4. 创建关联产品推荐
  // console.log('🔗 Creating product relations...');
  // const allProducts = await prisma.products.findMany();
  // let relationCount = 0;

  // for (let i = 0; i < allProducts.length; i++) {
  //   const product = allProducts[i];
  //   // 为每个产品添加 2-3 个关联产品
  //   const relatedProducts = allProducts
  //     .filter((p) => p.id !== product.id)
  //     .sort(() => Math.random() - 0.5)
  //     .slice(0, randomInt(2, 3));

  //   for (const related of relatedProducts) {
  //     await prisma.related_products.create({
  //       data: {
  //         productId: product.id,
  //         relatedProductId: related.id,
  //         type: randomChoice(['RELATED', 'UPSELL', 'CROSS_SELL']),
  //         sortOrder: relationCount
  //       }
  //     });
  //     relationCount++;
  //   }
  // }
  // console.log(`✅ Created ${relationCount} product relations`);
  // console.log('');

  // 5. 创建促销活动
  // console.log('🎉 Creating promotions...');
  // const promotion1 = await prisma.promotions.create({
  //   data: {
  //     id: 'promo-1',
  //     name: 'Black Friday Sale',
  //     description: '20% off sitewide, extra $100 off orders over $500',
  //     type: 'PERCENTAGE',
  //     value: decimal(20), // 20% off
  //     startDate: new Date('2024-11-25'),
  //     endDate: new Date('2024-11-26'),
  //     isActive: true,
  //     minPurchase: decimal(200),
  //     maxDiscount: decimal(500),
  //     usageLimit: 1000,
  //     usageCount: randomInt(100, 500)
  //   }
  // });

  // 关联部分产品到促销
  // const productsForPromo = allProducts.slice(0, 5);
  // for (const product of productsForPromo) {
  //   await prisma.promotion_products.create({
  //     data: {
  //       promotionId: promotion1.id,
  //       productId: product.id
  //     }
  //   });
  // }
  // console.log('✅ Created promotions');
  // console.log('');

  // 6. 创建优惠券
  // console.log('🎫 Creating coupons...');
  // await prisma.coupons.createMany({
  //   data: [
  //     {
  //       id: 'coupon-1',
  //       code: 'NEW50',
  //       description: 'New customer $50 off',
  //       type: 'FIXED_AMOUNT',
  //       value: decimal(50),
  //       minPurchase: decimal(200),
  //       usageLimit: 1000,
  //       usageLimitPerCustomer: 1,
  //       usageCount: randomInt(50, 200),
  //       startDate: new Date(),
  //       endDate: new Date('2025-12-31'),
  //       isActive: true
  //     },
  //     {
  //       id: 'coupon-2',
  //       code: 'VIP15',
  //       description: 'VIP members 15% off',
  //       type: 'PERCENTAGE',
  //       value: decimal(15),
  //       minPurchase: decimal(100),
  //       maxDiscount: decimal(200),
  //       usageLimit: 500,
  //       usageLimitPerCustomer: 10,
  //       usageCount: randomInt(20, 100),
  //       startDate: new Date(),
  //       endDate: new Date('2025-12-31'),
  //       isActive: true
  //     },
  //     {
  //       id: 'coupon-3',
  //       code: 'FREESHIP',
  //       description: 'Free shipping on orders over $300',
  //       type: 'FREE_SHIPPING',
  //       value: decimal(0),
  //       minPurchase: decimal(300),
  //       usageCount: randomInt(100, 300),
  //       startDate: new Date(),
  //       endDate: new Date('2025-12-31'),
  //       isActive: true
  //     }
  //   ]
  // });
  // console.log('✅ Created 3 coupons');
  // console.log('');

  // console.log('🎉 Data seeding completed!');
  // console.log('');
  // console.log('📊 Summary:');
  // console.log(`   - ${categories.length} categories`);
  // console.log(`   - ${tags.length} tags`);
  // console.log(`   - ${productCount} products`);
  // console.log(`   - ${variantCount} variants`);
  // console.log(`   - ${relationCount} product relations`);
  // console.log(`   - 1 promotion`);
  // console.log(`   - 3 coupons`);
  // console.log('');
  console.log("🚀 Ready to start development!");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
