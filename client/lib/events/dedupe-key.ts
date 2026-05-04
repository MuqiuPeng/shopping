import { CustomerEventType } from "@prisma/client";

export function buildDedupeKey(
  type: CustomerEventType,
  customerId: string,
  payload: Record<string, unknown>
): string {
  switch (type) {
    case "USER_SIGNUP":
      return `signup:${customerId}`;
    case "FAVORITE_ADDED":
      return `fav:${customerId}:${String(payload.productId)}`;
    case "ORDER_CREATED":
      return `order_created:${String(payload.orderId)}`;
    case "ORDER_PAID":
      return `order_paid:${String(payload.orderId)}`;
    case "ORDER_DELIVERED":
      return `order_delivered:${String(payload.orderId)}`;
    case "ORDER_CANCELLED":
      return `order_cancelled:${String(payload.orderId)}`;
    case "REVIEW_SUBMITTED":
      return `review_sub:${String(payload.reviewId)}`;
    case "REVIEW_APPROVED":
      return `review_app:${String(payload.reviewId)}`;
    case "BIRTHDAY":
      return `bd:${customerId}:${String(payload.yyyymmdd)}`;
    case "MILESTONE_TOTAL_SPENT":
      return `mts:${customerId}:${String(payload.threshold)}`;
    case "MILESTONE_ORDER_COUNT":
      return `moc:${customerId}:${String(payload.threshold)}`;
    default:
      return `${type}:${customerId}:${Date.now()}`;
  }
}
