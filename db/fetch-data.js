const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

async function fetchAllData() {
  console.log("📊 Fetching existing data from database...");

  try {
    // 1. 获取所有客户
    const customers = await prisma.customers.findMany({
      include: {
        addresses: true,
      },
    });
    console.log(`✅ Found ${customers.length} customers`);

    // 2. 获取所有产品及其变体
    const products = await prisma.products.findMany({
      where: {
        status: "ACTIVE",
        isActive: true,
      },
      include: {
        variants: {
          where: {
            isActive: true,
            inventory: {
              gt: 0,
            },
          },
        },
        product_images: {
          where: {
            isCover: true,
          },
        },
      },
    });
    console.log(`✅ Found ${products.length} active products`);

    // 计算有库存的变体数量
    const totalVariants = products.reduce(
      (sum, p) => sum + p.variants.length,
      0
    );
    console.log(`✅ Found ${totalVariants} variants with inventory`);

    // 3. 获取所有活跃的优惠券
    const coupons = await prisma.coupons.findMany({
      where: {
        isActive: true,
        startDate: {
          lte: new Date(),
        },
        endDate: {
          gte: new Date(),
        },
      },
    });
    console.log(`✅ Found ${coupons.length} active coupons`);

    // 保存到文件
    const data = {
      customers,
      products,
      coupons,
      fetchedAt: new Date().toISOString(),
    };

    fs.writeFileSync("existing-data.json", JSON.stringify(data, null, 2));
    console.log("✅ Data saved to existing-data.json");

    // 打印摘要
    console.log("\n📋 Data Summary:");
    console.log(`- Customers: ${customers.length}`);
    console.log(
      `- Customers with addresses: ${
        customers.filter((c) => c.addresses.length > 0).length
      }`
    );
    console.log(`- Products: ${products.length}`);
    console.log(`- Product variants: ${totalVariants}`);
    console.log(`- Active coupons: ${coupons.length}`);

    if (customers.filter((c) => c.addresses.length > 0).length === 0) {
      console.warn("\n⚠️  Warning: No customers with addresses found!");
      console.log("Please create customer addresses before creating orders.");
    }

    if (totalVariants === 0) {
      console.warn("\n⚠️  Warning: No product variants with inventory found!");
      console.log(
        "Please create products and variants before creating orders."
      );
    }

    return data;
  } catch (error) {
    console.error("❌ Error fetching data:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

fetchAllData();
