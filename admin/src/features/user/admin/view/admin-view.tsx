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
import { useAdminList } from '../hook/use-admin-list';

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
      setCurrentPage(0); // Reset to first page when searching
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const {
    data: adminUserList,
    isLoading,
    error,
    refetch
  } = useAdminList({
    limit: pageSize,
    offset: currentPage * pageSize,
    query: searchQuery,
    orderBy: orderBy,
    enabled: true
  });

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRoleVariant = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'destructive';
      case 'user':
      default:
        return 'secondary';
    }
  };

  const isPrimaryUser = (publicMetadata: any) => {
    return publicMetadata?.isPrimary === true;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className='space-y-4'>
        {/* Statistics Cards Skeleton */}
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
              Failed to load admin users
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
  if (
    !adminUserList ||
    !adminUserList.data ||
    adminUserList.data.length === 0
  ) {
    return (
      <div className='space-y-4'>
        <div className='bg-card rounded-lg border p-8 text-center'>
          <IconUsers className='text-muted-foreground mx-auto mb-4 h-12 w-12' />
          <h3 className='mb-2 text-lg font-medium'>No admin users found</h3>
          <p className='text-muted-foreground mb-4 text-sm'>
            There are no admin users in the system yet.
          </p>
          <Button variant='outline' onClick={refetch}>
            <IconRefresh className='mr-2 h-4 w-4' />
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const primaryAdmins = adminUserList.data.filter((user: any) =>
    isPrimaryUser(user.publicMetadata)
  ).length;
  const recentlyActive = adminUserList.data.filter((user: any) => {
    if (!user.lastSignInAt) return false;
    const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
    return user.lastSignInAt > dayAgo;
  }).length;

  return (
    <div className='space-y-6'>
      {/* Search and Controls */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-1 gap-4'>
          <div className='relative max-w-sm flex-1'>
            <input
              type='text'
              placeholder='Search users...'
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
              setCurrentPage(0); // Reset to first page when changing order
            }}
            className='border-input bg-background ring-offset-background focus-visible:ring-ring rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
          >
            <option value='-created_at'>Newest First</option>
            <option value='created_at'>Oldest First</option>
            <option value='-last_sign_in_at'>Last Sign In</option>
            <option value='first_name'>Name A-Z</option>
            <option value='-first_name'>Name Z-A</option>
          </select>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' onClick={() => refetch()}>
            <IconRefresh className='mr-2 h-4 w-4' />
            Refresh
          </Button>
          <span className='text-muted-foreground text-sm'>Page size:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(0); // Reset to first page
            }}
            className='border-input bg-background ring-offset-background focus-visible:ring-ring rounded-md border px-2 py-1 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className='grid gap-4 md:grid-cols-3'>
        <div className='bg-card rounded-lg border p-4'>
          <div className='flex items-center space-x-2'>
            <IconUsers className='h-4 w-4 text-blue-600' />
            <span className='text-sm font-medium'>Total Admins</span>
          </div>
          <div className='mt-2'>
            <div className='text-2xl font-bold'>{adminUserList.totalCount}</div>
            <p className='text-muted-foreground text-xs'>
              Total admin accounts ({adminUserList.data.length} shown)
            </p>
          </div>
        </div>

        <div className='bg-card rounded-lg border p-4'>
          <div className='flex items-center space-x-2'>
            <IconShield className='h-4 w-4 text-amber-600' />
            <span className='text-sm font-medium'>Primary Admins</span>
          </div>
          <div className='mt-2'>
            <div className='text-2xl font-bold'>{primaryAdmins}</div>
            <p className='text-muted-foreground text-xs'>Protected accounts</p>
          </div>
        </div>

        <div className='bg-card rounded-lg border p-4'>
          <div className='flex items-center space-x-2'>
            <IconUserCheck className='h-4 w-4 text-green-600' />
            <span className='text-sm font-medium'>Recently Active</span>
          </div>
          <div className='mt-2'>
            <div className='text-2xl font-bold'>{recentlyActive}</div>
            <p className='text-muted-foreground text-xs'>Last 24 hours</p>
          </div>
        </div>
      </div>

      {/* Admin Table */}
      <div className='bg-card overflow-x-auto rounded-lg border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-16'>Avatar</TableHead>
              <TableHead className='min-w-[150px]'>Name</TableHead>
              <TableHead className='min-w-[200px]'>Email</TableHead>
              <TableHead className='w-28 text-center'>Role</TableHead>
              <TableHead className='w-24 text-center'>Status</TableHead>
              <TableHead className='w-24 text-center'>Created</TableHead>
              <TableHead className='w-28 text-center'>Last Sign In</TableHead>
              <TableHead className='w-20 text-center'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminUserList.data.map((adminUser: any) => {
              const isPrimary = isPrimaryUser(adminUser.publicMetadata);

              return (
                <TableRow key={adminUser.id}>
                  <TableCell className='w-16'>
                    {adminUser.imageUrl ? (
                      <img
                        src={adminUser.imageUrl}
                        alt={
                          `${adminUser.firstName || ''} ${adminUser.lastName || ''}`.trim() ||
                          'User'
                        }
                        className='h-10 w-10 rounded-full object-cover'
                      />
                    ) : (
                      <div className='bg-muted flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium'>
                        {(
                          (adminUser.firstName?.[0] || '') +
                            (adminUser.lastName?.[0] || '') || '?'
                        ).toUpperCase()}
                      </div>
                    )}
                  </TableCell>

                  <TableCell className='min-w-[150px]'>
                    <div className='space-y-1'>
                      <div className='flex items-center gap-2'>
                        <span className='font-medium'>
                          {adminUser.firstName || adminUser.lastName
                            ? `${adminUser.firstName || ''} ${adminUser.lastName || ''}`.trim()
                            : 'No name provided'}
                        </span>
                        {isPrimary && (
                          <Badge
                            variant='secondary'
                            className='border-amber-200 bg-amber-100 text-xs text-amber-800'
                          >
                            Primary
                          </Badge>
                        )}
                      </div>
                      <div className='text-muted-foreground text-xs'>
                        ID: {adminUser.id.slice(-8)}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className='min-w-[200px] font-mono text-sm break-all'>
                    {adminUser.emailAddresses?.[0]?.emailAddress || 'No email'}
                  </TableCell>

                  <TableCell className='w-28 text-center'>
                    <Badge
                      variant={getRoleVariant(
                        adminUser.publicMetadata?.role || 'user'
                      )}
                      className='capitalize'
                    >
                      {adminUser.publicMetadata?.role || 'User'}
                    </Badge>
                  </TableCell>

                  <TableCell className='w-24 text-center'>
                    <Badge
                      variant={
                        adminUser.banned || adminUser.locked
                          ? 'destructive'
                          : 'default'
                      }
                      className='text-xs'
                    >
                      {adminUser.banned
                        ? 'Banned'
                        : adminUser.locked
                          ? 'Locked'
                          : 'Active'}
                    </Badge>
                  </TableCell>

                  <TableCell className='text-muted-foreground w-24 text-center text-sm whitespace-nowrap'>
                    {formatDate(adminUser.createdAt)}
                  </TableCell>

                  <TableCell className='text-muted-foreground w-28 text-center text-sm whitespace-nowrap'>
                    {adminUser.lastSignInAt
                      ? formatDate(adminUser.lastSignInAt)
                      : 'Never'}
                  </TableCell>

                  <TableCell className='w-20 text-center'>
                    <UserDetailDialog adminUserId={adminUser.id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className='space-y-4'>
        <div className='flex flex-col items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage(0)}
              disabled={currentPage === 0 || isLoading}
              className='h-8 w-8 p-0'
              title='First page'
            >
              <IconChevronsLeft className='h-4 w-4' />
            </Button>

            {/* Previous Page */}
            <Button
              variant='outline'
              size='sm'
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0 || isLoading}
              title='Previous page'
            >
              <IconChevronLeft className='mr-1 h-4 w-4' />
              Previous
            </Button>

            {/* Page Numbers */}
            <div className='flex items-center gap-1'>
              {Array.from(
                {
                  length: Math.min(
                    7,
                    Math.ceil(adminUserList.totalCount / pageSize)
                  )
                },
                (_, i) => {
                  const totalPages = Math.ceil(
                    adminUserList.totalCount / pageSize
                  );
                  let pageIndex: number;

                  // Smart pagination logic for better UX
                  if (totalPages <= 7) {
                    pageIndex = i;
                  } else if (currentPage <= 3) {
                    pageIndex = i;
                  } else if (currentPage >= totalPages - 4) {
                    pageIndex = totalPages - 7 + i;
                  } else {
                    pageIndex = currentPage - 3 + i;
                  }

                  if (pageIndex < 0 || pageIndex >= totalPages) return null;

                  return (
                    <Button
                      key={pageIndex}
                      variant={
                        currentPage === pageIndex ? 'default' : 'outline'
                      }
                      size='sm'
                      onClick={() => setCurrentPage(pageIndex)}
                      className='h-8 w-8 p-0'
                      disabled={isLoading}
                    >
                      {pageIndex + 1}
                    </Button>
                  );
                }
              )}
            </div>

            {/* Next Page */}
            <Button
              variant='outline'
              size='sm'
              onClick={() =>
                setCurrentPage(
                  Math.min(
                    Math.ceil(adminUserList.totalCount / pageSize) - 1,
                    currentPage + 1
                  )
                )
              }
              disabled={!adminUserList.pagination.hasMore || isLoading}
              title='Next page'
            >
              Next
              <IconChevronRight className='ml-1 h-4 w-4' />
            </Button>

            {/* Last Page */}
            <Button
              variant='outline'
              size='sm'
              onClick={() =>
                setCurrentPage(
                  Math.ceil(adminUserList.totalCount / pageSize) - 1
                )
              }
              disabled={
                currentPage ===
                  Math.ceil(adminUserList.totalCount / pageSize) - 1 ||
                isLoading
              }
              className='h-8 w-8 p-0'
              title='Last page'
            >
              <IconChevronsRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
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
            title='Admin Users'
            description='Manage admin accounts and user permissions.'
          />
        </div>
        <Separator />
        <Suspense
          fallback={
            <DataTableSkeleton columnCount={8} rowCount={10} filterCount={0} />
          }
        >
          <AdminTable />
        </Suspense>
      </div>
    </PageContainer>
  );
};

export default AdminView;
