import { CustomerEventType } from "@prisma/client";

export type EventPayloadMap = {
  USER_SIGNUP: { clerkId: string; email: string };
  FAVORITE_ADDED: { productId: string; favoriteId: string };
  ORDER_CREATED: { orderId: string; amount: number };
  ORDER_PAID: { orderId: string; amount: number; paymentMethod?: string };
  ORDER_DELIVERED: { orderId: string };
  ORDER_CANCELLED: { orderId: string };
  REVIEW_SUBMITTED: { reviewId: string; productId: string; rating: number };
  REVIEW_APPROVED: { reviewId: string; productId: string; rating: number };
  BIRTHDAY: { yyyymmdd: string };
  MILESTONE_TOTAL_SPENT: { totalSpent: number; threshold: number };
  MILESTONE_ORDER_COUNT: { orderCount: number; threshold: number };
};

export type EmitInput<T extends CustomerEventType = CustomerEventType> = {
  type: T;
  customerId: string;
  payload: EventPayloadMap[T];
  /** override default dedupe key derivation */
  dedupeKey?: string;
};

export type EmitResult = {
  eventId: string | null;
  status: "processed" | "skipped" | "failed";
  grantedCouponId: string | null;
  reason?: string;
};
