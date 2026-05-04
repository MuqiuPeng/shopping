import { CustomerEventType } from '@prisma/client';
import type { TriggerConditionKey, AudienceFilterKey } from './types';

export type ConditionFieldDef = {
  key: TriggerConditionKey;
  label: string;
  type: 'number' | 'switch';
  helperText?: string;
  max?: number;
  min?: number;
};

export type AudienceFieldDef = {
  key: AudienceFilterKey;
  label: string;
  type: 'number' | 'switch';
  helperText?: string;
};

/** Whether the event type already has a wired-up trigger source. */
export const SUPPORTED_EVENT_TYPES: Record<CustomerEventType, boolean> = {
  USER_SIGNUP: true,
  FAVORITE_ADDED: true,
  BIRTHDAY: true,
  ORDER_CREATED: false,
  ORDER_PAID: false,
  ORDER_DELIVERED: false,
  ORDER_CANCELLED: false,
  REVIEW_SUBMITTED: false,
  REVIEW_APPROVED: false,
  MILESTONE_TOTAL_SPENT: false,
  MILESTONE_ORDER_COUNT: false,
};

export const EVENT_TYPE_LABELS: Record<CustomerEventType, string> = {
  USER_SIGNUP: 'Customer signs up',
  FAVORITE_ADDED: 'Customer favorites a product',
  ORDER_CREATED: 'Order created',
  ORDER_PAID: 'Order paid',
  ORDER_DELIVERED: 'Order delivered',
  ORDER_CANCELLED: 'Order cancelled',
  REVIEW_SUBMITTED: 'Review submitted',
  REVIEW_APPROVED: 'Review approved',
  BIRTHDAY: 'Customer birthday',
  MILESTONE_TOTAL_SPENT: 'Total spent milestone',
  MILESTONE_ORDER_COUNT: 'Order count milestone',
};

export const CONDITION_FIELDS_BY_EVENT: Record<CustomerEventType, ConditionFieldDef[]> = {
  USER_SIGNUP: [],
  FAVORITE_ADDED: [
    { key: 'favoriteCountGte', label: 'Favorite count ≥', type: 'number', min: 1 },
  ],
  ORDER_CREATED: [
    { key: 'orderCountEq', label: 'Order # =', type: 'number', helperText: '1 = first order', min: 1 },
    { key: 'orderAmountGte', label: 'Order amount ≥', type: 'number', min: 0 },
  ],
  ORDER_PAID: [
    { key: 'orderCountEq', label: 'Order # =', type: 'number', helperText: '1 = first paid order', min: 1 },
    { key: 'orderAmountGte', label: 'Order amount ≥', type: 'number', min: 0 },
    { key: 'totalSpentGte', label: 'Total spent ≥', type: 'number', min: 0 },
  ],
  ORDER_DELIVERED: [
    { key: 'orderAmountGte', label: 'Order amount ≥', type: 'number', min: 0 },
  ],
  ORDER_CANCELLED: [],
  REVIEW_SUBMITTED: [
    { key: 'reviewMinRating', label: 'Min rating', type: 'number', min: 1, max: 5 },
    { key: 'approvedOnly', label: 'Require approved review', type: 'switch' },
  ],
  REVIEW_APPROVED: [
    { key: 'reviewMinRating', label: 'Min rating', type: 'number', min: 1, max: 5 },
  ],
  BIRTHDAY: [],
  MILESTONE_TOTAL_SPENT: [
    { key: 'thresholdEq', label: 'Threshold =', type: 'number', min: 0 },
  ],
  MILESTONE_ORDER_COUNT: [
    { key: 'thresholdEq', label: 'Threshold =', type: 'number', min: 1 },
  ],
};

export const AUDIENCE_FIELDS: AudienceFieldDef[] = [
  {
    key: 'newCustomerOnly',
    label: 'New customers only',
    type: 'switch',
    helperText: 'Customers with zero paid orders',
  },
  {
    key: 'existingTotalSpentGte',
    label: 'Existing total spent ≥',
    type: 'number',
  },
  { key: 'ageGte', label: 'Age ≥', type: 'number', helperText: 'Requires birthday on file' },
];
