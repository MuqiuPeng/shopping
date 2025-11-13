import CustomerView from '@/features/user/customer/view/customer-view';
import React from 'react';

export const metadata = {
  title: 'Dashboard : Customer View'
};

interface PageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    orderBy?: 'createdAt' | 'email' | 'firstName';
  }>;
}

const page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  return <CustomerView searchParams={params} />;
};

export default page;
