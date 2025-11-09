'use client';

import { Suspense, useState, useEffect } from 'react';
import {
  IconRefresh,
  IconUsers,
  IconUserCheck,
  IconShield,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight
} from '@tabler/icons-react';

import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import UserDetailDialog from '../component/admin-detail-dialog';
import { useOrgMemberList } from '../hook/user-org-member';

const AdminTable = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderBy, setOrderBy] = useState('-created_at');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, error, refetch } = useOrgMemberList();

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRoleVariant = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'org:admin':
        return 'destructive';
      case 'org:member':
      default:
        return 'secondary';
    }
  };

  const getRoleName = (role: string) => {
    return role?.replace('org:', '') || 'member';
  };

  // Loading state
  if (isLoading) {
    return (
      <div className='space-y-4'>
        <div className='grid gap-4 md:grid-cols-3'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='bg-card rounded-lg border p-4'>
              <div className='flex items-center space-x-2'>
                <div className='bg-muted h-4 w-4 animate-pulse rounded' />
                <div className='bg-muted h-4 w-16 animate-pulse rounded' />
              </div>
              <div className='mt-2'>
                <div className='bg-muted h-8 w-12 animate-pulse rounded' />
                <div className='bg-muted mt-1 h-3 w-24 animate-pulse rounded' />
              </div>
            </div>
          ))}
        </div>
        <DataTableSkeleton columnCount={7} rowCount={10} filterCount={0} />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className='space-y-4'>
        <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
          <div className='mb-2 flex items-center gap-2'>
            <IconUsers className='h-5 w-5 text-red-600' />
            <h3 className='font-medium text-red-800'>
              Failed to load memberships
            </h3>
          </div>
          <p className='mb-3 text-sm text-red-700'>{error.message || error}</p>
          <Button variant='outline' size='sm' onClick={refetch}>
            <IconRefresh className='mr-2 h-4 w-4' />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // No data state
  if (!data?.data?.data || data.data.data.length === 0) {
    return (
      <div className='space-y-4'>
        <div className='bg-card rounded-lg border p-8 text-center'>
          <IconUsers className='text-muted-foreground mx-auto mb-4 h-12 w-12' />
          <h3 className='mb-2 text-lg font-medium'>No memberships found</h3>
          <p className='text-muted-foreground mb-4 text-sm'>
            There are no organization memberships yet.
          </p>
          <Button variant='outline' onClick={refetch}>
            <IconRefresh className='mr-2 h-4 w-4' />
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  const membershipList = data.data.data;
  const totalCount = data.data.totalCount;

  // Calculate statistics
  const adminMembers = membershipList.filter(
    (member: any) => member.role === 'org:admin'
  ).length;
  const recentlyJoined = membershipList.filter((member: any) => {
    const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
    return member.createdAt > dayAgo;
  }).length;

  return (
    <div className='space-y-6'>
      {/* Search and Controls */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-1 gap-4'>
          <div className='relative max-w-sm flex-1'>
            <input
              type='text'
              placeholder='Search members...'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className='border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
            />
            {searchInput !== searchQuery && (
              <div className='absolute top-1/2 right-3 -translate-y-1/2'>
                <div className='h-2 w-2 animate-pulse rounded-full bg-blue-500' />
              </div>
            )}
          </div>
          <select
            value={orderBy}
            onChange={(e) => {
              setOrderBy(e.target.value);
              setCurrentPage(0);
            }}
            className='border-input bg-background ring-offset-background focus-visible:ring-ring rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
          >
            <option value='-created_at'>Newest First</option>
            <option value='created_at'>Oldest First</option>
            <option value='-updated_at'>Recently Updated</option>
            <option value='role'>Role</option>
          </select>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' onClick={() => refetch()}>
            <IconRefresh className='mr-2 h-4 w-4' />
            Refresh
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className='grid gap-4 md:grid-cols-3'>
        <div className='bg-card rounded-lg border p-4'>
          <div className='flex items-center space-x-2'>
            <IconUsers className='h-4 w-4 text-blue-600' />
            <span className='text-sm font-medium'>Total Members</span>
          </div>
          <div className='mt-2'>
            <div className='text-2xl font-bold'>{totalCount}</div>
            <p className='text-muted-foreground text-xs'>
              Organization members
            </p>
          </div>
        </div>

        <div className='bg-card rounded-lg border p-4'>
          <div className='flex items-center space-x-2'>
            <IconShield className='h-4 w-4 text-amber-600' />
            <span className='text-sm font-medium'>Admins</span>
          </div>
          <div className='mt-2'>
            <div className='text-2xl font-bold'>{adminMembers}</div>
            <p className='text-muted-foreground text-xs'>Admin members</p>
          </div>
        </div>

        <div className='bg-card rounded-lg border p-4'>
          <div className='flex items-center space-x-2'>
            <IconUserCheck className='h-4 w-4 text-green-600' />
            <span className='text-sm font-medium'>Recently Joined</span>
          </div>
          <div className='mt-2'>
            <div className='text-2xl font-bold'>{recentlyJoined}</div>
            <p className='text-muted-foreground text-xs'>Last 24 hours</p>
          </div>
        </div>
      </div>

      {/* Membership Table */}
      <div className='bg-card overflow-x-auto rounded-lg border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-16'>Avatar</TableHead>
              <TableHead className='min-w-[150px]'>Member</TableHead>
              <TableHead className='min-w-[200px]'>Email</TableHead>
              <TableHead className='min-w-[150px]'>Organization</TableHead>
              <TableHead className='w-28 text-center'>Role</TableHead>
              <TableHead className='w-24 text-center'>Permissions</TableHead>
              <TableHead className='w-24 text-center'>Joined</TableHead>
              <TableHead className='w-28 text-center'>Last Updated</TableHead>
              <TableHead className='w-20 text-center'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {membershipList.map((membership: any) => {
              const userData = membership.publicUserData;
              const orgData = membership.organization;

              return (
                <TableRow key={membership.id}>
                  <TableCell className='w-16'>
                    {userData?.imageUrl ? (
                      <img
                        src={userData.imageUrl}
                        alt={
                          `${userData.firstName || ''} ${userData.lastName || ''}`.trim() ||
                          'User'
                        }
                        className='h-10 w-10 rounded-full object-cover'
                      />
                    ) : (
                      <div className='bg-muted flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium'>
                        {(
                          (userData?.firstName?.[0] || '') +
                            (userData?.lastName?.[0] || '') || '?'
                        ).toUpperCase()}
                      </div>
                    )}
                  </TableCell>

                  <TableCell className='min-w-[150px]'>
                    <div className='space-y-1'>
                      <div className='font-medium'>
                        {userData?.firstName || userData?.lastName
                          ? `${userData.firstName || ''} ${userData.lastName || ''}`.trim()
                          : 'No name'}
                      </div>
                      <div className='text-muted-foreground text-xs'>
                        ID: {membership.id.slice(-8)}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className='min-w-[200px] font-mono text-sm break-all'>
                    {userData?.identifier || 'No email'}
                  </TableCell>

                  <TableCell className='min-w-[150px]'>
                    <div className='flex items-center gap-2'>
                      {orgData?.imageUrl && (
                        <img
                          src={orgData.imageUrl}
                          alt={orgData.name}
                          className='h-6 w-6 rounded'
                        />
                      )}
                      <div>
                        <div className='font-medium'>{orgData?.name}</div>
                        <div className='text-muted-foreground text-xs'>
                          {orgData?.slug}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className='w-28 text-center'>
                    <Badge
                      variant={getRoleVariant(membership.role)}
                      className='capitalize'
                    >
                      {getRoleName(membership.role)}
                    </Badge>
                  </TableCell>

                  <TableCell className='w-24 text-center'>
                    <Badge variant='outline' className='text-xs'>
                      {membership.permissions?.length || 0}
                    </Badge>
                  </TableCell>

                  <TableCell className='text-muted-foreground w-24 text-center text-sm whitespace-nowrap'>
                    {formatDate(membership.createdAt)}
                  </TableCell>

                  <TableCell className='text-muted-foreground w-28 text-center text-sm whitespace-nowrap'>
                    {formatDate(membership.updatedAt)}
                  </TableCell>

                  <TableCell className='w-20 text-center'>
                    <UserDetailDialog adminUserId={userData?.userId} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const AdminView = () => {
  return (
    <PageContainer scrollable={false}>
      <div className='flex flex-1 flex-col space-y-4'>
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
