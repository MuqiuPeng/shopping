'use client';

import { Suspense } from 'react';

import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';

import { AdminTable } from '../component/admin-table';

const AdminView = () => {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4 overflow-x-hidden'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Organization Memberships'
            description='Manage organization members and their roles.'
          />
        </div>
        <Separator />
        <Suspense
          fallback={
            <DataTableSkeleton columnCount={9} rowCount={10} filterCount={0} />
          }
        >
          <AdminTable />
        </Suspense>
      </div>
    </PageContainer>
  );
};

export default AdminView;
