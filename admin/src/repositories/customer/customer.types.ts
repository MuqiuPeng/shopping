import { paginationType } from '../shared-type';

export type Customer = {
  id: string;
  clerkId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  imageUrl: string | null;
  phone: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

// export interface CreateCustomerDTO {
//   clerkId: string;
//   email: string;
//   firstName?: string;
//   lastName?: string;
//   username?: string;
//   imageUrl?: string;
//   phone?: string;
//   role?: string;
// }

// export interface UpdateCustomerDTO {
//   email?: string;
//   firstName?: string;
//   lastName?: string;
//   username?: string;
//   imageUrl?: string;
//   phone?: string;
// }

// export interface CustomerFilters {
//   email?: string;
//   clerkId?: string;
//   role?: string;
//   search?: string;
// }

// export interface CustomerWithRelations extends Customer {
//   orders?: any[];
//   addresses?: any[];
//   carts?: any | null;
//   reviews?: any[];
//   wishlist_items?: any[];
//   _count?: {
//     orders: number;
//     addresses: number;
//     reviews: number;
//     wishlist_items: number;
//   };
// }

export interface PaginatedCustomersOutput {
  data: Customer[];
  pagination: paginationType;
}

export interface GetAllCustomersInputProps {
  page: number;
  pageSize: number;
  orderBy: 'createdAt' | 'email' | 'firstName';
}
