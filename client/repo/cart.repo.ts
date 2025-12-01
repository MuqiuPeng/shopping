import { db } from "@/lib/prisma";
import { randomUUID } from "crypto";

type AddItemResult = {
  cartId: string;
  items: Array<{
    id: string;
    variantId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
  }>;
};

export class CartRepo {
  static async customerAddingCart({
    customerId,
    variantId,
    quantity = 1,
  }: {
    customerId: string;
    variantId: string;
    quantity?: number;
  }) {
    if (!customerId) throw new Error("customerId is required");
    if (!variantId) throw new Error("variantId is required");
    if (quantity <= 0) throw new Error("quantity must be >= 1");

    return await db.$transaction(async (tx) => {
      let cart = await tx.carts.findUnique({
        where: { customerId },
      });

      if (!cart) {
        cart = await tx.carts.create({
          data: {
            customerId,
          },
        });
      }

      // 2) 查找是否已有 cart_item
      const existing = await tx.cart_items.findUnique({
        where: {
          cartId_variantId: {
            cartId: cart.id,
            variantId,
          },
        },
      });

      // 3) 更新或创建 cart_item
      if (existing) {
        await tx.cart_items.update({
          where: { id: existing.id },
          data: {
            quantity: existing.quantity + quantity,
          },
        });
      } else {
        await tx.cart_items.create({
          data: {
            cartId: cart.id,
            variantId,
            quantity,
            createdAt: new Date(),
          },
        });
      }

      // 返回最新购物车
      return tx.cart_items.findMany({
        where: { cartId: cart.id },
        orderBy: { updatedAt: "desc" },
      });
    });
  }

  static async touristAddingCart({
    localCart,
    variantId,
    quantity = 1,
  }: {
    localCart?: {
      items: Array<{
        variantId: string;
        quantity: number;
      }>;
    } | null;
    variantId: string;
    quantity?: number;
  }) {
    if (!variantId) throw new Error("variantId is required");
    if (quantity <= 0) throw new Error("quantity must be >= 1");

    // 如果本地没有 cart，则创建一个新的 cart 结构
    const cart = localCart ?? { items: [] };

    // 查找是否已有同 variant
    const existing = cart.items.find((i) => i.variantId === variantId);

    if (existing) {
      existing.quantity += quantity; // 累加
    } else {
      cart.items.push({
        variantId,
        quantity,
      });
    }

    return cart;
  }

  static async mergeLocalCartToCustomerCart({
    customerId,
    localItems,
  }: {
    customerId: string;
    localItems: Array<{ variantId: string; quantity: number }>;
  }) {
    if (!localItems?.length) return;

    for (const item of localItems) {
      await this.customerAddingCart({
        customerId,
        variantId: item.variantId,
        quantity: item.quantity,
      });
    }
  }
}
