"use server";

import { CartRepo } from "@/repo";
import { currentUser } from "@clerk/nextjs/server";

export interface UpdateCartInfoActionInput {
  variantId: string;
  quantity?: number;
}

export const updateCartInfoAction = async (
  input: UpdateCartInfoActionInput
) => {
  try {
    const user = await currentUser();

    if (!user) {
      // User not logged in
      return { error: "User not logged in" };
    }

    // Example: get customer info
    const customerInfo = {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      fullName: user.firstName + " " + user.lastName,
    };

    await CartRepo.customerAddingCart({
      customerClerkId: customerInfo.id,
      variantId: input.variantId,
      quantity: input.quantity || 1,
    });
  } catch (error) {
    console.log(
      `Failed to update cart information: ${(error as Error).message}`
    );
    throw new Error(`Failed to update cart information`);
  }
};

export interface GetCartItemsByVariantInput {
  variantId: string;
}
export const fetchCartItemsByCustomerClerkIdAction = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "User not logged in" };
    }

    const cartItems = await CartRepo.fetchCartItemsByCustomerClerkId(user.id);

    return { cartItems };
  } catch (error) {
    console.log(`Failed to fetch cart items: ${(error as Error).message}`);
    throw new Error(`Failed to fetch cart items`);
  }
};

/* Get user cart item by variant ID */
// to support product details pages "Add to cart" button
export const fetchCartItemCountByVariantAction = async (
  input: GetCartItemsByVariantInput
) => {
  try {
    const user = await currentUser();

    if (!user) {
      return { error: "User not logged in" };
    }

    const cartItemCount = await CartRepo.fetchCartItemByVariantId({
      customerClerkId: user.id,
      variantId: input.variantId,
    });

    return { cartItemCount };
  } catch (error) {
    console.log(`Failed to fetch cart item: ${(error as Error).message}`);
    throw new Error(`Failed to fetch cart item`);
  }
};
