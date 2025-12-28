import { OrderStatus, PaymentStatus } from '@prisma/client';

// 创建订单项数据
export type CreateOrderItemData = {
  productName: string;
  productSlug: string;
  productImage?: string;
  quantity: number;
  price: number;
  total: number;
  variantId: string;
  variantName?: string;
};

// 创建订单数据
export type CreateOrderData = {
  customerId: string;
  addressId?: string;
  shippingFullName: string;
  shippingPhone: string;
  shippingAddressLine1: string;
  shippingAddressLine2?: string;
  shippingCity: string;
  shippingState?: string;
  shippingPostalCode: string;
  shippingCountry: string;
  subtotal: number;
  shippingCost?: number;
  tax?: number;
  discount?: number;
  total: number;
  couponId?: string;
  paymentMethod?: string;
  customerNote?: string;
  items: CreateOrderItemData[];
};

// 更新订单数据
export type UpdateOrderData = {
  id: string;
  addressId?: string;
  shippingFullName?: string;
  shippingPhone?: string;
  shippingAddressLine1?: string;
  shippingAddressLine2?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;
  subtotal?: number;
  shippingCost?: number;
  tax?: number;
  discount?: number;
  total?: number;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  paymentMethod?: string;
  trackingNumber?: string;
  shippedAt?: Date;
  deliveredAt?: Date;
  customerNote?: string;
  adminNote?: string;
  cancelReason?: string;
  refundAmount?: number;
};

// 更新订单状态
export type UpdateOrderStatusData = {
  id: string;
  status: OrderStatus;
  trackingNumber?: string;
  shippedAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  cancelReason?: string;
  refundedAt?: Date;
  refundAmount?: number;
  adminNote?: string;
};

// 更新支付状态
export type UpdatePaymentStatusData = {
  id: string;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
};

// 订单查询参数
export type GetOrdersParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  customerId?: string;
  startDate?: Date;
  endDate?: Date;
};

// 序列化后的订单项
export type SerializedOrderItem = {
  id: string;
  orderId: string;
  productName: string;
  productSlug: string;
  productImage: string | null;
  quantity: number;
  price: number;
  total: number;
  createdAt: string;
  variantId: string;
  variantName: string | null;
};

// 序列化后的订单
export type SerializedOrder = {
  id: string;
  orderNumber: string;
  addressId: string | null;
  shippingFullName: string;
  shippingPhone: string;
  shippingAddressLine1: string;
  shippingAddressLine2: string | null;
  shippingCity: string;
  shippingState: string | null;
  shippingPostalCode: string;
  shippingCountry: string;
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string | null;
  trackingNumber: string | null;
  shippedAt: string | null;
  deliveredAt: string | null;
  customerNote: string | null;
  adminNote: string | null;
  cancelledAt: string | null;
  cancelReason: string | null;
  refundedAt: string | null;
  refundAmount: number | null;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  couponId: string | null;
  order_items?: SerializedOrderItem[];
  customers?: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    username: string | null;
    phone: string | null;
  };
  coupons?: {
    id: string;
    code: string;
    type: string;
    value: number;
  } | null;
};

// 订单列表响应
export type GetOrdersResponse = {
  items: SerializedOrder[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
