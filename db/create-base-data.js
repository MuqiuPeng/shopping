const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

// 中国城市地址数据
const addressesData = [
  {
    fullName: "张三",
    phone: "13800138000",
    addressLine1: "朝阳区建国路88号SOHO现代城",
    addressLine2: "A座1001室",
    city: "北京",
    state: "北京市",
    postalCode: "100020",
    country: "China",
    isDefault: true,
  },
  {
    fullName: "李四",
    phone: "13900139000",
    addressLine1: "浦东新区陆家嘴环路1000号",
    addressLine2: "恒生银行大厦20楼",
    city: "上海",
    state: "上海市",
    postalCode: "200120",
    country: "China",
    isDefault: false,
  },
  {
    fullName: "王五",
    phone: "13700137000",
    addressLine1: "天河区天河路208号粤海天河城",
    addressLine2: null,
    city: "广州",
    state: "广东省",
    postalCode: "510620",
    country: "China",
    isDefault: true,
  },
  {
    fullName: "赵六",
    phone: "13600136000",
    addressLine1: "南山区科技园高新南四道18号",
    addressLine2: "创维半导体设计大厦东座501",
    city: "深圳",
    state: "广东省",
    postalCode: "518057",
    country: "China",
    isDefault: false,
  },
];

// 手链产品数据
const productsData = [
  {
    name: "星辰转运珠手链",
    slug: "star-lucky-bead-bracelet",
    description:
      "精选天然玛瑙材质，搭配925纯银转运珠，寓意好运常伴。采用传统手工编织工艺，佩戴舒适，适合日常搭配。",
    isActive: true,
    isFeatured: true,
    isNew: true,
    status: "ACTIVE",
    thumbnail:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800",
    variants: [
      {
        sku: "STAR-RED-S",
        name: "红色-小号",
        price: 188.0,
        compareAtPrice: 258.0,
        cost: 88.0,
        inventory: 50,
        color: "红色",
        size: "S",
        material: "玛瑙+925银",
      },
      {
        sku: "STAR-RED-M",
        name: "红色-中号",
        price: 198.0,
        compareAtPrice: 268.0,
        cost: 92.0,
        inventory: 45,
        color: "红色",
        size: "M",
        material: "玛瑙+925银",
      },
      {
        sku: "STAR-BLACK-S",
        name: "黑色-小号",
        price: 188.0,
        compareAtPrice: 258.0,
        cost: 88.0,
        inventory: 40,
        color: "黑色",
        size: "S",
        material: "玛瑙+925银",
      },
    ],
  },
  {
    name: "莲花菩提手串",
    slug: "lotus-bodhi-bracelet",
    description:
      "采用精选星月菩提子，经过细致打磨，温润如玉。莲花造型吊坠，寓意清净圆满，适合禅修静心。",
    isActive: true,
    isFeatured: true,
    isNew: false,
    status: "ACTIVE",
    thumbnail:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800",
    variants: [
      {
        sku: "LOTUS-8MM",
        name: "8mm珠径",
        price: 288.0,
        compareAtPrice: 388.0,
        cost: 128.0,
        inventory: 35,
        size: "8mm",
        material: "星月菩提",
      },
      {
        sku: "LOTUS-10MM",
        name: "10mm珠径",
        price: 328.0,
        compareAtPrice: 428.0,
        cost: 148.0,
        inventory: 30,
        size: "10mm",
        material: "星月菩提",
      },
    ],
  },
  {
    name: "水晶能量手链",
    slug: "crystal-energy-bracelet",
    description:
      "天然紫水晶与粉水晶混搭设计，兼具美观与能量。据传能够舒缓情绪，提升个人气场，是送礼佳品。",
    isActive: true,
    isFeatured: false,
    isNew: true,
    status: "ACTIVE",
    thumbnail:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
    variants: [
      {
        sku: "CRYSTAL-PURPLE",
        name: "紫水晶",
        price: 368.0,
        compareAtPrice: 488.0,
        cost: 168.0,
        inventory: 25,
        color: "紫色",
        material: "天然紫水晶",
      },
      {
        sku: "CRYSTAL-PINK",
        name: "粉水晶",
        price: 358.0,
        compareAtPrice: 478.0,
        cost: 158.0,
        inventory: 28,
        color: "粉色",
        material: "天然粉水晶",
      },
      {
        sku: "CRYSTAL-MIX",
        name: "混搭款",
        price: 398.0,
        compareAtPrice: 528.0,
        cost: 178.0,
        inventory: 20,
        color: "混合",
        material: "紫水晶+粉水晶",
      },
    ],
  },
  {
    name: "编织情侣手绳",
    slug: "woven-couple-bracelet",
    description:
      "红绳编织，简约而不失精致。采用中国结传统工艺，可刻字定制，适合情侣或闺蜜佩戴。",
    isActive: true,
    isFeatured: false,
    isNew: false,
    status: "ACTIVE",
    thumbnail:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800",
    variants: [
      {
        sku: "COUPLE-RED",
        name: "经典红绳",
        price: 88.0,
        compareAtPrice: 128.0,
        cost: 38.0,
        inventory: 100,
        color: "红色",
        material: "编织红绳",
      },
      {
        sku: "COUPLE-BLACK",
        name: "黑色皮绳",
        price: 88.0,
        compareAtPrice: 128.0,
        cost: 38.0,
        inventory: 80,
        color: "黑色",
        material: "编织皮绳",
      },
    ],
  },
  {
    name: "和田玉平安扣手链",
    slug: "hetian-jade-peace-bracelet",
    description:
      "新疆和田玉精工雕刻，平安扣造型寓意平安吉祥。玉质温润细腻，佩戴能养人。",
    isActive: true,
    isFeatured: true,
    isNew: false,
    status: "ACTIVE",
    thumbnail:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800",
    variants: [
      {
        sku: "JADE-WHITE",
        name: "白玉款",
        price: 888.0,
        compareAtPrice: 1288.0,
        cost: 388.0,
        inventory: 15,
        color: "白色",
        material: "和田白玉",
      },
      {
        sku: "JADE-GREEN",
        name: "碧玉款",
        price: 988.0,
        compareAtPrice: 1388.0,
        cost: 438.0,
        inventory: 12,
        color: "绿色",
        material: "和田碧玉",
      },
    ],
  },
];

async function main() {
  console.log("🌱 Creating base data for orders...");

  // 读取现有数据
  let existingData;
  try {
    const fileContent = fs.readFileSync("existing-data.json", "utf-8");
    existingData = JSON.parse(fileContent);
  } catch (error) {
    console.error(
      "❌ Error reading existing-data.json. Please run fetch-data.js first."
    );
    process.exit(1);
  }

  const { customers } = existingData;

  if (customers.length === 0) {
    console.error("❌ No customers found. Please create customers first.");
    process.exit(1);
  }

  try {
    // 1. 为每个客户创建地址
    console.log("\n📍 Creating addresses for customers...");
    let addressCount = 0;
    for (const customer of customers) {
      // 为每个客户创建1-2个地址
      const numAddresses = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < numAddresses; i++) {
        const addressTemplate =
          addressesData[addressCount % addressesData.length];
        await prisma.addresses.create({
          data: {
            id: `addr_${customer.id}_${i}`,
            ...addressTemplate,
            isDefault: i === 0, // 第一个地址设为默认
            createdAt: new Date(),
            updatedAt: new Date(),
            customerId: customer.id,
          },
        });
        addressCount++;
      }
    }
    console.log(
      `✅ Created ${addressCount} addresses for ${customers.length} customers`
    );

    // 2. 创建产品和变体
    console.log("\n📦 Creating products and variants...");
    let productCount = 0;
    let variantCount = 0;

    for (const productData of productsData) {
      const { variants, ...productInfo } = productData;

      const product = await prisma.products.create({
        data: {
          ...productInfo,
          createdAt: new Date(),
          updatedAt: new Date(),
          publishedAt: new Date(),
        },
      });
      productCount++;

      // 创建变体
      for (const variantData of variants) {
        await prisma.product_variants.create({
          data: {
            ...variantData,
            productId: product.id,
            isDefault:
              variantData.sku.includes("RED-S") ||
              variantData.sku.includes("8MM"),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        variantCount++;
      }

      // 创建一个产品主图
      await prisma.product_images.create({
        data: {
          id: `img_${product.id}`,
          productId: product.id,
          url: productInfo.thumbnail,
          altText: productInfo.name,
          sortOrder: 0,
          isCover: true,
          createdAt: new Date(),
        },
      });
    }

    console.log(
      `✅ Created ${productCount} products with ${variantCount} variants`
    );

    console.log("\n🎉 Base data creation completed!");
    console.log("\n📊 Summary:");
    console.log(`- Addresses created: ${addressCount}`);
    console.log(`- Products created: ${productCount}`);
    console.log(`- Variants created: ${variantCount}`);
    console.log(
      "\n💡 Next: Run 'node fetch-data.js' to refresh data, then 'node create-orders.js' to create orders"
    );
  } catch (error) {
    console.error("❌ Error creating base data:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error("❌ Error:", e);
  process.exit(1);
});
