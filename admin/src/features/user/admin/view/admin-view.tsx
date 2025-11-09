'use client';

import { Suspense, useState, useEffect, useMemo } from 'react';
import {
  IconRefresh,
  IconUsers,
  IconUserCheck,
  IconShield,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconArrowUp,
  IconArrowDown,
  IconArrowsSort
} from '@tabler/icons-react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState
} from '@tanstack/react-table';

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

// Type definitions based on your data structure
type PublicUserData = {
  identifier: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  hasImage: boolean;
  userId: string;
};

type Organization = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  hasImage: boolean;
  createdAt: number;
  updatedAt: number;
  maxAllowedMemberships: number;
  adminDeleteEnabled: boolean;
  createdBy: string;
};

type OrganizationMembership = {
  id: string;
  role: string;
  permissions: string[];
  publicMetadata: Record<string, any>;
  privateMetadata: Record<string, any>;
  createdAt: number;
  updatedAt: number;
  organization: Organization;
  publicUserData: PublicUserData;
};

const AdminTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const { data, isLoading, error, refetch } = useOrgMemberList();
  console.log(JSON.stringify(data, null, 2));

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

  // Define columns using TanStack Table
  const columns = useMemo<ColumnDef<OrganizationMembership>[]>(
    () => [
      {
        accessorKey: 'publicUserData.imageUrl',
        id: 'avatar',
        header: 'Avatar',
        enableSorting: false,
        cell: ({ row }) => {
          const userData = row.original.publicUserData;
          return userData?.imageUrl ? (
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
          );
        }
      },
      {
        accessorFn: (row) =>
          `${row.publicUserData?.firstName || ''} ${row.publicUserData?.lastName || ''}`.trim() ||
          'No name',
        id: 'member',
        header: 'Member',
        cell: ({ row }) => {
          const userData = row.original.publicUserData;
          return (
            <div className='space-y-1'>
              <div className='font-medium'>
                {userData?.firstName || userData?.lastName
                  ? `${userData.firstName || ''} ${userData.lastName || ''}`.trim()
                  : 'No name'}
              </div>
              <div className='text-muted-foreground text-xs'>
                ID: {row.original.id.slice(-8)}
              </div>
            </div>
          );
        }
      },
      {
        accessorKey: 'publicUserData.identifier',
        id: 'email',
        header: 'Email',
        cell: ({ getValue }) => (
          <span className='font-mono text-sm break-all'>
            {(getValue() as string) || 'No email'}
          </span>
        )
      },
      {
        accessorKey: 'organization.name',
        id: 'organization',
        header: 'Organization',
        cell: ({ row }) => {
          const orgData = row.original.organization;
          return (
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
          );
        }
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ getValue }) => {
          const role = getValue() as string;
          return (
            <div className='text-center'>
              <Badge variant={getRoleVariant(role)} className='capitalize'>
                {getRoleName(role)}
              </Badge>
            </div>
          );
        }
      },
      {
        accessorKey: 'permissions',
        header: 'Permissions',
        enableSorting: false,
        cell: ({ getValue }) => {
          const permissions = getValue() as string[];
          return (
            <div className='text-center'>
              <Badge variant='outline' className='text-xs'>
                {permissions?.length || 0}
              </Badge>
            </div>
          );
        }
      },
      {
        accessorKey: 'createdAt',
        header: 'Joined',
        cell: ({ getValue }) => (
          <div className='text-muted-foreground text-center text-sm whitespace-nowrap'>
            {formatDate(getValue() as number)}
          </div>
        )
      },
      {
        accessorKey: 'updatedAt',
        header: 'Last Updated',
        cell: ({ getValue }) => (
          <div className='text-muted-foreground text-center text-sm whitespace-nowrap'>
            {formatDate(getValue() as number)}
          </div>
        )
      },
      {
        id: 'actions',
        header: 'Actions',
        enableSorting: false,
        cell: ({ row }) => {
          const userData = row.original.publicUserData;
          return (
            <div className='text-center'>
              <UserDetailDialog adminUserId={userData?.userId} />
            </div>
          );
        }
      }
    ],
    []
  );

  const membershipList = data?.data?.data || [];

  const table = useReactTable({
    data: membershipList,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10
      }
    }
  });

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
        <DataTableSkeleton columnCount={9} rowCount={10} filterCount={0} />
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

  const totalCount = data.data.totalCount;

  // Calculate statistics
  const adminMembers = membershipList.filter(
    (member: OrganizationMembership) => member.role === 'org:admin'
  ).length;
  const recentlyJoined = membershipList.filter(
    (member: OrganizationMembership) => {
      const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
      return member.createdAt > dayAgo;
    }
  ).length;

  return (
    <div className='space-y-6'>
      {/* Search and Controls */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex flex-1 gap-4'>
          <div className='relative max-w-sm flex-1'>
            <input
              type='text'
              placeholder='Search members...'
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className='border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
            />
          </div>
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

      {/* Membership Table with TanStack Table */}
      <div className='space-y-4'>
        <div className='bg-card overflow-x-auto rounded-lg border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : ''
                      }
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className='flex items-center gap-2'>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getCanSort() && (
                          <span className='text-muted-foreground'>
                            {header.column.getIsSorted() === 'asc' ? (
                              <IconArrowUp className='h-4 w-4' />
                            ) : header.column.getIsSorted() === 'desc' ? (
                              <IconArrowDown className='h-4 w-4' />
                            ) : (
                              <IconArrowsSort className='h-4 w-4' />
                            )}
                          </span>
                        )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
          <div className='text-muted-foreground text-sm'>
            Showing{' '}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{' '}
            to{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{' '}
            of {table.getFilteredRowModel().rows.length} results
          </div>

          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <IconChevronsLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <IconChevronLeft className='h-4 w-4' />
            </Button>

            <div className='flex items-center gap-2'>
              <span className='text-sm'>
                Page {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </span>
            </div>

            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <IconChevronRight className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <IconChevronsRight className='h-4 w-4' />
            </Button>
          </div>

          <div className='flex items-center gap-2'>
            <span className='text-sm'>Rows per page:</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className='border-input bg-background ring-offset-background focus-visible:ring-ring rounded-md border px-2 py-1 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
            >
              {[5, 10, 20, 30, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
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
