const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const categories = [
  // TOP LEVEL
  // {
  //   id: 'cate-all',
  //   name: 'All Categories',
  //   slug: 'all-categories',
  //   description: 'All categories',
  //   imageUrl: '',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   parentId: null, // Top level
  //   isProtected: true,
  // },
  // {
  //   id: 'marketing-all',
  //   name: 'All Marketing categories',
  //   slug: 'all-marketing-categories',
  //   description: 'All marketing categories',
  //   imageUrl: '',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   parentId: null, // Top level
  //   isProtected: true,
  //   allowChildren: false
  // },
  // {
  //   id: 'marketing-hot-buy',
  //   name: 'Hot Buy',
  //   slug: 'marketing-hot-buy',
  //   description: 'Hot Buy marketing category',
  //   imageUrl: '',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   parentId: 'marketing-all', // Top level
  //   isProtected: true,
  //   allowChildren: false
  // },
  // {
  //   id: "marketing-recommend",
  //   name: "Recommend",
  //   slug: "marketing-recommend",
  //   description: "Recommend marketing category",
  //   imageUrl: "",
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   parentId: "marketing-all", // Top level
  //   isProtected: true,
  //   allowChildren: false,
  // },
];

// Mock Coupon Data
const coupons = [
  {
    code: "WELCOME10",
    description: "新用户专享10%折扣",
    type: "PERCENTAGE",
    value: 10,
    minPurchase: 100,
    maxDiscount: 50,
    usageLimit: 1000,
    usageLimitPerCustomer: 1,
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-12-31"),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: "SAVE20",
    description: "满200减20元",
    type: "FIXED_AMOUNT",
    value: 20,
    minPurchase: 200,
    maxDiscount: null,
    usageLimit: 500,
    usageLimitPerCustomer: 3,
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-06-30"),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: "FREESHIP",
    description: "免运费券",
    type: "FREE_SHIPPING",
    value: 0,
    minPurchase: 150,
    maxDiscount: null,
    usageLimit: null,
    usageLimitPerCustomer: null,
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-12-31"),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: "VIP15",
    description: "VIP会员专享15%折扣",
    type: "PERCENTAGE",
    value: 15,
    minPurchase: 300,
    maxDiscount: 100,
    usageLimit: 2000,
    usageLimitPerCustomer: 5,
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-12-31"),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: "FLASH50",
    description: "限时抢购满500减50",
    type: "FIXED_AMOUNT",
    value: 50,
    minPurchase: 500,
    maxDiscount: null,
    usageLimit: 100,
    usageLimitPerCustomer: 1,
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-03-31"),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: "SUMMER25",
    description: "夏季大促25%折扣",
    type: "PERCENTAGE",
    value: 25,
    minPurchase: 400,
    maxDiscount: 150,
    usageLimit: 300,
    usageLimitPerCustomer: 2,
    startDate: new Date("2025-06-01"),
    endDate: new Date("2025-08-31"),
    isActive: false, // 未来活动，暂时不激活
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: "NEWYEAR100",
    description: "新年特惠满1000减100",
    type: "FIXED_AMOUNT",
    value: 100,
    minPurchase: 1000,
    maxDiscount: null,
    usageLimit: 200,
    usageLimitPerCustomer: 1,
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-02-28"),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: "EXPIRED20",
    description: "已过期的20%折扣券",
    type: "PERCENTAGE",
    value: 20,
    minPurchase: 200,
    maxDiscount: 80,
    usageLimit: 500,
    usageLimitPerCustomer: 1,
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function main() {
  console.log("🌱 Starting database cleanup...");

  // 清理 coupons 数据
  await prisma.coupons.deleteMany();
  console.log("✅ Cleared coupons data");

  // await prisma.categories.deleteMany();

  console.log("✅ Database cleanup completed");
  console.log("");

  // 1. Category Creation
  console.log("📁 Creating categories...");
  for (const cat of categories) {
    await prisma.categories.create({ data: cat });
  }
  console.log(`✅ Created ${categories.length} categories`);

  // 2. Mock Coupon Data Creation
  console.log("🎟️  Creating mock coupon data...");
  for (const coupon of coupons) {
    await prisma.coupons.create({ data: coupon });
  }
  console.log(`✅ Created ${coupons.length} coupons`);

  console.log("🚀 Initialization is Finished");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
