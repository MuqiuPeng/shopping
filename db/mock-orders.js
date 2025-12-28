const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Mock 订单数据 - 涵盖不同的订单状态和场景
const mockOrders = [
  // 1. 待处理订单 - 新订单，待支付
  {
    id: "order-pending-001",
    orderNumber: "ORD-2025-001",
    customerId: "cmhvomuoy0000w66rxpjagay5",
    addressId: "addr-001",
    shippingFullName: "张三",
    shippingPhone: "13800138000",
    shippingAddressLine1: "北京市朝阳区建国路88号",
    shippingAddressLine2: "SOHO现代城A座1001",
    shippingCity: "北京",
    shippingState: "北京市",
    shippingPostalCode: "100025",
    shippingCountry: "China",
    subtotal: 299.0,
    shippingCost: 15.0,
    tax: 0,
    discount: 0,
    total: 314.0,
    status: "PENDING",
    paymentStatus: "PENDING",
    paymentMethod: null,
    customerNote: "请尽快发货",
    createdAt: new Date("2025-12-26T10:00:00"),
    updatedAt: new Date("2025-12-26T10:00:00"),
  },

  // 2. 处理中订单 - 已支付，正在处理
  {
    id: "order-processing-001",
    orderNumber: "ORD-2025-002",
    customerId: "cmhvomuoy0000w66rxpjagay5",
    addressId: "addr-002",
    shippingFullName: "李四",
    shippingPhone: "13900139000",
    shippingAddressLine1: "上海市浦东新区陆家嘴环路1000号",
    shippingAddressLine2: "恒生银行大厦20楼",
    shippingCity: "上海",
    shippingState: "上海市",
    shippingPostalCode: "200120",
    shippingCountry: "China",
    subtotal: 598.0,
    shippingCost: 0, // 使用了免运费券
    tax: 0,
    discount: 0,
    total: 598.0,
    status: "PROCESSING",
    paymentStatus: "PAID",
    paymentMethod: "alipay",
    couponId: "coupon-freeship", // 使用了免运费优惠券
    createdAt: new Date("2025-12-25T14:30:00"),
    updatedAt: new Date("2025-12-26T09:00:00"),
  },

  // 3. 已发货订单 - 运输中
  {
    id: "order-shipped-001",
    orderNumber: "ORD-2025-003",
    customerId: "cmhvomuoy0000w66rxpjagay5",
    addressId: "addr-001",
    shippingFullName: "张三",
    shippingPhone: "13800138000",
    shippingAddressLine1: "北京市朝阳区建国路88号",
    shippingAddressLine2: "SOHO现代城A座1001",
    shippingCity: "北京",
    shippingState: "北京市",
    shippingPostalCode: "100025",
    shippingCountry: "China",
    subtotal: 450.0,
    shippingCost: 15.0,
    tax: 0,
    discount: 45.0, // 使用了10%折扣券
    total: 420.0,
    status: "SHIPPED",
    paymentStatus: "PAID",
    paymentMethod: "wechat",
    trackingNumber: "SF1234567890",
    couponId: "coupon-welcome10",
    shippedAt: new Date("2025-12-24T16:00:00"),
    customerNote: "工作日配送",
    createdAt: new Date("2025-12-23T11:20:00"),
    updatedAt: new Date("2025-12-24T16:00:00"),
  },

  // 4. 已完成订单 - 已送达
  {
    id: "order-delivered-001",
    orderNumber: "ORD-2025-004",
    customerId: "cmhvomuoy0000w66rxpjagay5",
    addressId: "addr-003",
    shippingFullName: "王五",
    shippingPhone: "13700137000",
    shippingAddressLine1: "广州市天河区天河路123号",
    shippingAddressLine2: null,
    shippingCity: "广州",
    shippingState: "广东省",
    shippingPostalCode: "510000",
    shippingCountry: "China",
    subtotal: 1200.0,
    shippingCost: 20.0,
    tax: 0,
    discount: 100.0, // 满1000减100
    total: 1120.0,
    status: "DELIVERED",
    paymentStatus: "PAID",
    paymentMethod: "alipay",
    trackingNumber: "YTO9876543210",
    couponId: "coupon-newyear100",
    shippedAt: new Date("2025-12-20T10:00:00"),
    deliveredAt: new Date("2025-12-22T15:30:00"),
    createdAt: new Date("2025-12-19T09:00:00"),
    updatedAt: new Date("2025-12-22T15:30:00"),
  },

  // 5. 已取消订单 - 用户取消
  {
    id: "order-cancelled-001",
    orderNumber: "ORD-2025-005",
    customerId: "cmhvomuoy0000w66rxpjagay5",
    addressId: "addr-002",
    shippingFullName: "李四",
    shippingPhone: "13900139000",
    shippingAddressLine1: "上海市浦东新区陆家嘴环路1000号",
    shippingAddressLine2: "恒生银行大厦20楼",
    shippingCity: "上海",
    shippingState: "上海市",
    shippingPostalCode: "200120",
    shippingCountry: "China",
    subtotal: 350.0,
    shippingCost: 15.0,
    tax: 0,
    discount: 0,
    total: 365.0,
    status: "CANCELLED",
    paymentStatus: "PENDING",
    paymentMethod: null,
    cancelledAt: new Date("2025-12-21T12:00:00"),
    cancelReason: "不想要了",
    createdAt: new Date("2025-12-21T10:00:00"),
    updatedAt: new Date("2025-12-21T12:00:00"),
  },

  // 6. 已退款订单 - 售后退款
  {
    id: "order-refunded-001",
    orderNumber: "ORD-2025-006",
    customerId: "cmhvomuoy0000w66rxpjagay5",
    addressId: "addr-003",
    shippingFullName: "王五",
    shippingPhone: "13700137000",
    shippingAddressLine1: "广州市天河区天河路123号",
    shippingAddressLine2: null,
    shippingCity: "广州",
    shippingState: "广东省",
    shippingPostalCode: "510000",
    shippingCountry: "China",
    subtotal: 680.0,
    shippingCost: 15.0,
    tax: 0,
    discount: 68.0,
    total: 627.0,
    status: "REFUNDED",
    paymentStatus: "REFUNDED",
    paymentMethod: "wechat",
    trackingNumber: "SF2468135790",
    shippedAt: new Date("2025-12-18T14:00:00"),
    deliveredAt: new Date("2025-12-20T10:00:00"),
    refundedAt: new Date("2025-12-23T11:00:00"),
    refundAmount: 627.0,
    cancelReason: "质量问题",
    adminNote: "已确认退款",
    createdAt: new Date("2025-12-17T16:00:00"),
    updatedAt: new Date("2025-12-23T11:00:00"),
  },

  // 7. 大额订单 - 使用VIP优惠券
  {
    id: "order-vip-001",
    orderNumber: "ORD-2025-007",
    customerId: "cmhvomuoy0000w66rxpjagay5",
    addressId: "addr-004",
    shippingFullName: "赵六",
    shippingPhone: "13600136000",
    shippingAddressLine1: "深圳市南山区科技园南区",
    shippingAddressLine2: "腾讯大厦35楼",
    shippingCity: "深圳",
    shippingState: "广东省",
    shippingPostalCode: "518000",
    shippingCountry: "China",
    subtotal: 2580.0,
    shippingCost: 0,
    tax: 0,
    discount: 100.0, // VIP15%折扣，但有最大折扣限制100元
    total: 2480.0,
    status: "PROCESSING",
    paymentStatus: "PAID",
    paymentMethod: "alipay",
    couponId: "coupon-vip15",
    customerNote: "请仔细包装",
    adminNote: "VIP客户，优先处理",
    createdAt: new Date("2025-12-26T08:00:00"),
    updatedAt: new Date("2025-12-26T09:30:00"),
  },

  // 8. 支付失败订单
  {
    id: "order-failed-001",
    orderNumber: "ORD-2025-008",
    customerId: "cmhvomuoy0000w66rxpjagay5",
    addressId: "addr-001",
    shippingFullName: "张三",
    shippingPhone: "13800138000",
    shippingAddressLine1: "北京市朝阳区建国路88号",
    shippingAddressLine2: "SOHO现代城A座1001",
    shippingCity: "北京",
    shippingState: "北京市",
    shippingPostalCode: "100025",
    shippingCountry: "China",
    subtotal: 188.0,
    shippingCost: 15.0,
    tax: 0,
    discount: 0,
    total: 203.0,
    status: "PENDING",
    paymentStatus: "FAILED",
    paymentMethod: "alipay",
    createdAt: new Date("2025-12-26T11:00:00"),
    updatedAt: new Date("2025-12-26T11:05:00"),
  },
];

// Mock 地址数据
const mockAddresses = [
  {
    id: "addr-001",
    customerId: "cmhvomuoy0000w66rxpjagay5",
    fullName: "张三  - address1",
    phone: "13800138000",
    addressLine1: "北京市朝阳区建国路88号",
    addressLine2: "SOHO现代城A座1001",
    city: "北京",
    state: "北京市",
    postalCode: "100025",
    country: "China",
    isDefault: true,
    createdAt: new Date("2025-11-01T00:00:00"),
    updatedAt: new Date("2025-11-01T00:00:00"),
  },
  {
    id: "addr-002",
    customerId: "cmhvomuoy0000w66rxpjagay5",
    fullName: "张三 - address2",
    phone: "13900139000",
    addressLine1: "上海市浦东新区陆家嘴环路1000号",
    addressLine2: "恒生银行大厦20楼",
    city: "上海",
    state: "上海市",
    postalCode: "200120",
    country: "China",
    isDefault: true,
    createdAt: new Date("2025-11-05T00:00:00"),
    updatedAt: new Date("2025-11-05T00:00:00"),
  },
];

async function main() {
  console.log("🌱 开始创建订单 Mock 数据...");
  console.log("");

  // 1. 创建产品（如果不存在）
  console.log("📦 创建产品数据...");
  for (const product of mockProducts) {
    await prisma.products.upsert({
      where: { id: product.id },
      update: {},
      create: product,
    });
  }
  console.log(`✅ 创建了 ${mockProducts.length} 个产品`);

  // 2. 创建产品变体（如果不存在）
  console.log("🎨 创建产品变体数据...");
  for (const variant of mockProductVariants) {
    await prisma.product_variants.upsert({
      where: { id: variant.id },
      update: {},
      create: variant,
    });
  }
  console.log(`✅ 创建了 ${mockProductVariants.length} 个产品变体`);

  // 4. 创建客户（如果不存在）
  console.log("👥 创建客户数据...");
  for (const customer of mockCustomers) {
    await prisma.customers.upsert({
      where: { id: customer.id },
      update: {},
      create: customer,
    });
  }
  console.log(`✅ 创建了 ${mockCustomers.length} 个客户`);

  // 5. 创建地址（如果不存在）
  console.log("📍 创建地址数据...");
  for (const address of mockAddresses) {
    await prisma.addresses.upsert({
      where: { id: address.id },
      update: {},
      create: address,
    });
  }
  console.log(`✅ 创建了 ${mockAddresses.length} 个地址`);

  // 6. 创建订单
  console.log("🛒 创建订单数据...");
  for (const order of mockOrders) {
    await prisma.orders.upsert({
      where: { id: order.id },
      update: {},
      create: order,
    });
  }
  console.log(`✅ 创建了 ${mockOrders.length} 个订单`);

  // 7. 创建订单项
  console.log("📝 创建订单项数据...");
  for (const item of mockOrderItems) {
    await prisma.order_items.upsert({
      where: { id: item.id },
      update: {},
      create: item,
    });
  }
  console.log(`✅ 创建了 ${mockOrderItems.length} 个订单项`);

  console.log("");
  console.log("🎉 订单 Mock 数据创建完成！");
  console.log("");
  console.log("📊 数据统计：");
  console.log(`   - 客户: ${mockCustomers.length}`);
  console.log(`   - 地址: ${mockAddresses.length}`);
  console.log(`   - 产品: ${mockProducts.length}`);
  console.log(`   - 产品变体: ${mockProductVariants.length}`);
  console.log(`   - 优惠券: ${mockCoupons.length}`);
  console.log(`   - 订单: ${mockOrders.length}`);
  console.log(`   - 订单项: ${mockOrderItems.length}`);
  console.log("");
  console.log("📋 订单状态分布：");
  console.log(`   - PENDING (待处理): 2`);
  console.log(`   - PROCESSING (处理中): 2`);
  console.log(`   - SHIPPED (已发货): 1`);
  console.log(`   - DELIVERED (已送达): 1`);
  console.log(`   - CANCELLED (已取消): 1`);
  console.log(`   - REFUNDED (已退款): 1`);
}

main()
  .catch((e) => {
    console.error("❌ 错误:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
