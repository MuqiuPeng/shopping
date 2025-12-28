const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

// 辅助函数：生成订单号
function generateOrderNumber() {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `ORD${timestamp}${random}`;
}

// 辅助函数：生成随机日期
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// 辅助函数：随机选择数组元素
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// 辅助函数：随机选择 1-3 个不重复的产品变体
function randomVariants(products, count = null) {
  const allVariants = [];
  products.forEach((product) => {
    product.variants.forEach((variant) => {
      allVariants.push({
        ...variant,
        productName: product.name,
        productSlug: product.slug,
        productImage: product.product_images[0]?.url || product.thumbnail,
      });
    });
  });

  const selectedCount = count || Math.floor(Math.random() * 3) + 1; // 1-3 items
  const selected = [];
  const usedIndices = new Set();

  while (
    selected.length < selectedCount &&
    selected.length < allVariants.length
  ) {
    const index = Math.floor(Math.random() * allVariants.length);
    if (!usedIndices.has(index)) {
      usedIndices.add(index);
      selected.push(allVariants[index]);
    }
  }

  return selected;
}

async function createMockOrders() {
  console.log("🚀 Starting order creation...");

  // 读取已存在的数据
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

  const { customers, products, coupons } = existingData;

  // 验证数据
  if (customers.length === 0) {
    console.error("❌ No customers found. Please create customers first.");
    process.exit(1);
  }

  if (products.length === 0) {
    console.error("❌ No products found. Please create products first.");
    process.exit(1);
  }

  const customersWithAddresses = customers.filter(
    (c) => c.addresses.length > 0
  );
  if (customersWithAddresses.length === 0) {
    console.error(
      "❌ No customers with addresses found. Please create addresses first."
    );
    process.exit(1);
  }

  console.log(
    `✅ Using ${customersWithAddresses.length} customers with addresses`
  );
  console.log(`✅ Using ${products.length} products`);
  console.log(`✅ Using ${coupons.length} active coupons`);

  // 订单状态分布
  const orderStatuses = [
    { status: "PENDING", paymentStatus: "PENDING", weight: 10 },
    { status: "PROCESSING", paymentStatus: "PAID", weight: 15 },
    { status: "SHIPPED", paymentStatus: "PAID", weight: 30 },
    { status: "DELIVERED", paymentStatus: "PAID", weight: 35 },
    { status: "CANCELLED", paymentStatus: "FAILED", weight: 5 },
    { status: "REFUNDED", paymentStatus: "REFUNDED", weight: 5 },
  ];

  // 支付方式
  const paymentMethods = ["credit_card", "alipay", "wechat_pay", "paypal"];

  // 生成订单
  const ordersToCreate = [];
  const numberOfOrders = Math.min(20, customersWithAddresses.length * 10); // 每个客户最多10个订单

  for (let i = 0; i < numberOfOrders; i++) {
    // 随机选择客户
    const customer = randomChoice(customersWithAddresses);
    const address = randomChoice(customer.addresses);

    // 随机选择订单状态
    const totalWeight = orderStatuses.reduce((sum, s) => sum + s.weight, 0);
    let random = Math.random() * totalWeight;
    let selectedStatus = orderStatuses[0];
    for (const status of orderStatuses) {
      random -= status.weight;
      if (random <= 0) {
        selectedStatus = status;
        break;
      }
    }

    // 随机选择产品变体
    const selectedVariants = randomVariants(products);

    // 计算订单金额
    const items = selectedVariants.map((variant) => {
      const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 个
      const price = parseFloat(variant.price);
      const total = price * quantity;

      return {
        variantId: variant.id,
        productName: variant.productName,
        productSlug: variant.productSlug,
        productImage: variant.productImage,
        variantName: variant.name,
        quantity,
        price,
        total,
      };
    });

    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const shippingCost = subtotal >= 200 ? 0 : 15; // 满200免运费
    const tax = subtotal * 0.06; // 6% 税

    // 随机应用优惠券（30% 概率）
    let coupon = null;
    let discount = 0;
    if (Math.random() < 0.3 && coupons.length > 0) {
      coupon = randomChoice(coupons);
      if (subtotal >= parseFloat(coupon.minPurchase || 0)) {
        if (coupon.type === "PERCENTAGE") {
          discount = Math.min(
            subtotal * (parseFloat(coupon.value) / 100),
            parseFloat(coupon.maxDiscount || discount)
          );
        } else if (coupon.type === "FIXED_AMOUNT") {
          discount = parseFloat(coupon.value);
        } else if (coupon.type === "FREE_SHIPPING") {
          discount = shippingCost;
        }
      }
    }

    const total = subtotal + shippingCost + tax - discount;

    // 生成订单日期（2024年1月-2025年12月）
    const createdAt = randomDate(new Date(2024, 0, 1), new Date());

    const order = {
      id: `order_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`,
      orderNumber: generateOrderNumber(),
      customerId: customer.id,
      addressId: address.id,
      shippingFullName: address.fullName,
      shippingPhone: address.phone,
      shippingAddressLine1: address.addressLine1,
      shippingAddressLine2: address.addressLine2,
      shippingCity: address.city,
      shippingState: address.state,
      shippingPostalCode: address.postalCode,
      shippingCountry: address.country,
      subtotal,
      shippingCost,
      tax,
      discount,
      total,
      status: selectedStatus.status,
      paymentStatus: selectedStatus.paymentStatus,
      paymentMethod:
        selectedStatus.paymentStatus !== "PENDING"
          ? randomChoice(paymentMethods)
          : null,
      couponId: coupon?.id || null,
      createdAt,
      updatedAt: createdAt,
      items,
    };

    // 添加状态相关的时间戳
    if (selectedStatus.status === "SHIPPED") {
      order.shippedAt = new Date(createdAt.getTime() + 2 * 24 * 60 * 60 * 1000);
      order.trackingNumber = `TRK${Date.now().toString().slice(-10)}${i}`;
    } else if (selectedStatus.status === "DELIVERED") {
      order.shippedAt = new Date(createdAt.getTime() + 2 * 24 * 60 * 60 * 1000);
      order.deliveredAt = new Date(
        createdAt.getTime() + 5 * 24 * 60 * 60 * 1000
      );
      order.trackingNumber = `TRK${Date.now().toString().slice(-10)}${i}`;
    } else if (selectedStatus.status === "CANCELLED") {
      order.cancelledAt = new Date(
        createdAt.getTime() + 1 * 24 * 60 * 60 * 1000
      );
      order.cancelReason = "客户取消订单";
    } else if (selectedStatus.status === "REFUNDED") {
      order.refundedAt = new Date(
        createdAt.getTime() + 3 * 24 * 60 * 60 * 1000
      );
      order.refundAmount = total;
      order.shippedAt = new Date(createdAt.getTime() + 2 * 24 * 60 * 60 * 1000);
      order.deliveredAt = new Date(
        createdAt.getTime() + 5 * 24 * 60 * 60 * 1000
      );
    }

    ordersToCreate.push(order);
  }

  // 创建订单
  console.log(`\n📦 Creating ${ordersToCreate.length} orders...`);

  try {
    let successCount = 0;
    for (const orderData of ordersToCreate) {
      const { items, ...orderInfo } = orderData;

      await prisma.orders.create({
        data: {
          ...orderInfo,
          order_items: {
            create: items.map((item, idx) => ({
              id: `item_${orderInfo.id}_${idx}`,
              variantId: item.variantId,
              productName: item.productName,
              productSlug: item.productSlug,
              productImage: item.productImage,
              variantName: item.variantName,
              quantity: item.quantity,
              price: item.price,
              total: item.total,
            })),
          },
        },
      });

      successCount++;
      if (successCount % 5 === 0) {
        console.log(
          `✅ Created ${successCount}/${ordersToCreate.length} orders...`
        );
      }
    }

    console.log(`\n🎉 Successfully created ${ordersToCreate.length} orders!`);

    // 统计信息
    const statusCounts = {};
    ordersToCreate.forEach((order) => {
      statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
    });

    console.log("\n📊 Order Status Distribution:");
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`- ${status}: ${count} orders`);
    });

    const totalRevenue = ordersToCreate
      .filter((o) => o.paymentStatus === "PAID")
      .reduce((sum, o) => sum + o.total, 0);
    console.log(
      `\n💰 Total Revenue (Paid Orders): ¥${totalRevenue.toFixed(2)}`
    );

    const avgOrderValue =
      totalRevenue /
      ordersToCreate.filter((o) => o.paymentStatus === "PAID").length;
    console.log(`📈 Average Order Value: ¥${avgOrderValue.toFixed(2)}`);

    const ordersWithCoupons = ordersToCreate.filter((o) => o.couponId).length;
    console.log(
      `🎟️  Orders with Coupons: ${ordersWithCoupons} (${(
        (ordersWithCoupons / ordersToCreate.length) *
        100
      ).toFixed(1)}%)`
    );
  } catch (error) {
    console.error("❌ Error creating orders:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createMockOrders();
