'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useQueryState, parseAsInteger } from 'nuqs';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  flexRender
} from '@tanstack/react-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

import {
  MoreHorizontal,
  Search,
  X,
  Eye,
  Edit,
  Ban,
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { OrderStatusBadge } from '../component/order-status-badge';
import { PaymentStatusBadge } from '../component/payment-status-badge';
import { useOrderList } from '../hook/use-order-list';
import { SerializedOrder } from '@/repositories/order/order.type';
import PageContainer from '@/components/layout/page-container';

type Order = SerializedOrder;

export default function OrderListView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>('all');
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    orderId: string | null;
  }>({
    open: false,
    orderId: null
  });

  const {
    orders,
    total,
    totalPages,
    currentPage: page,
    pageSize,
    setPage,
    isLoading
  } = useOrderList();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDeleteOrder = (orderId: string) => {
    setDeleteDialog({ open: true, orderId });
  };

  const confirmDelete = () => {
    // In production, this would call an API to delete the order
    console.log('Deleting order:', deleteDialog.orderId);
    setDeleteDialog({ open: false, orderId: null });
  };

  // Define table columns
  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: 'orderNumber',
        header: 'Order Number',
        cell: ({ getValue }) => (
          <span className='font-mono text-sm font-medium whitespace-nowrap'>
            {getValue() as string}
          </span>
        )
      },
      {
        accessorKey: 'customers',
        header: 'Customer',
        cell: ({ row }) => {
          const customer = row.original.customers;
          const name = customer
            ? `${customer.lastName || ''}${customer.firstName || ''}`.trim() ||
              customer.email
            : 'N/A';
          const phone = customer?.phone || row.original.shippingPhone;
          return (
            <div className='flex flex-col whitespace-nowrap'>
              <span className='font-medium'>{name}</span>
              <span className='text-muted-foreground text-xs'>{phone}</span>
            </div>
          );
        }
      },
      {
        accessorKey: 'status',
        header: 'Order Status',
        cell: ({ getValue }) => (
          <div className='whitespace-nowrap'>
            <OrderStatusBadge status={getValue() as Order['status']} />
          </div>
        )
      },
      {
        accessorKey: 'paymentStatus',
        header: 'Payment Status',
        cell: ({ getValue }) => (
          <div className='whitespace-nowrap'>
            <PaymentStatusBadge status={getValue() as Order['paymentStatus']} />
          </div>
        )
      },
      {
        accessorKey: 'subtotal',
        header: 'Subtotal',
        cell: ({ getValue }) => (
          <div className='text-right whitespace-nowrap tabular-nums'>
            {formatCurrency(getValue() as number)}
          </div>
        )
      },
      {
        accessorKey: 'discount',
        header: 'Discount',
        cell: ({ getValue }) => {
          const discount = getValue() as number;
          return (
            <div className='text-right whitespace-nowrap tabular-nums'>
              {discount > 0 ? (
                <span className='text-success'>
                  -{formatCurrency(discount)}
                </span>
              ) : (
                <span className='text-muted-foreground'>—</span>
              )}
            </div>
          );
        }
      },
      {
        accessorKey: 'shippingCost',
        header: 'Shipping',
        cell: ({ getValue }) => {
          const shipping = getValue() as number;
          return (
            <div className='text-right whitespace-nowrap tabular-nums'>
              {shipping > 0 ? (
                formatCurrency(shipping)
              ) : (
                <span className='text-success font-medium'>FREE</span>
              )}
            </div>
          );
        }
      },
      {
        accessorKey: 'tax',
        header: 'Tax',
        cell: ({ getValue }) => (
          <div className='text-right whitespace-nowrap tabular-nums'>
            {formatCurrency(getValue() as number)}
          </div>
        )
      },
      {
        accessorKey: 'total',
        header: 'Total',
        cell: ({ getValue }) => (
          <div className='text-right font-semibold whitespace-nowrap tabular-nums'>
            {formatCurrency(getValue() as number)}
          </div>
        )
      },
      {
        accessorKey: 'coupons',
        header: 'Coupon',
        cell: ({ row }) => {
          const code = row.original.coupons?.code;
          return (
            <div className='whitespace-nowrap'>
              {code ? (
                <code className='bg-accent rounded px-2 py-1 font-mono text-xs'>
                  {code}
                </code>
              ) : (
                <span className='text-muted-foreground'>—</span>
              )}
            </div>
          );
        }
      },
      {
        accessorKey: 'createdAt',
        header: 'Created',
        cell: ({ getValue }) => (
          <span className='text-muted-foreground text-sm whitespace-nowrap'>
            {formatDate(getValue() as string)}
          </span>
        )
      },
      {
        id: 'actions',
        cell: ({ row }) => (
          <div className='whitespace-nowrap'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon' className='h-8 w-8'>
                  <MoreHorizontal className='h-4 w-4' />
                  <span className='sr-only'>Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/order/${row.original.id}`}>
                    <Eye className='mr-2 h-4 w-4' />
                    View Details
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/order/${row.original.id}/edit`}>
                    <Edit className='mr-2 h-4 w-4' />
                    Edit Order
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Ban className='mr-2 h-4 w-4' />
                  Cancel Order
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='text-destructive focus:text-destructive'
                  onClick={() => handleDeleteOrder(row.original.id)}
                >
                  <Trash2 className='mr-2 h-4 w-4' />
                  Delete Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      }
    ],
    [formatCurrency, formatDate]
  );

  // Create table instance
  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setOrderStatusFilter('all');
    setPaymentStatusFilter('all');
  };

  return (
    <PageContainer scrollable={true}>
      <div className='w-full space-y-6 overflow-auto'>
        {/* Header */}
        <div>
          <h1 className='text-foreground text-3xl font-semibold tracking-tight'>
            Orders
          </h1>
          <p className='text-muted-foreground mt-1 text-sm'>
            Manage customer orders, payments, and fulfillment
          </p>
        </div>

        {/* Filters Card */}
        <Card className='border-border bg-card'>
          <CardHeader>
            <CardTitle className='text-base font-medium'>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-4 md:flex-row md:items-end'>
              {/* Search */}
              <div className='flex-1'>
                <label
                  htmlFor='search'
                  className='text-foreground mb-2 block text-sm font-medium'
                >
                  Search
                </label>
                <div className='relative'>
                  <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
                  <Input
                    id='search'
                    placeholder='Order Number / Customer / Phone'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='pl-10'
                  />
                </div>
              </div>

              {/* Order Status */}
              <div className='w-full md:w-48'>
                <label
                  htmlFor='order-status'
                  className='text-foreground mb-2 block text-sm font-medium'
                >
                  Order Status
                </label>
                <Select
                  value={orderStatusFilter}
                  onValueChange={setOrderStatusFilter}
                >
                  <SelectTrigger id='order-status'>
                    <SelectValue placeholder='All Statuses' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Statuses</SelectItem>
                    <SelectItem value='PENDING'>Pending</SelectItem>
                    <SelectItem value='PROCESSING'>Processing</SelectItem>
                    <SelectItem value='SHIPPED'>Shipped</SelectItem>
                    <SelectItem value='DELIVERED'>Delivered</SelectItem>
                    <SelectItem value='CANCELLED'>Cancelled</SelectItem>
                    <SelectItem value='REFUNDED'>Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Status */}
              <div className='w-full md:w-48'>
                <label
                  htmlFor='payment-status'
                  className='text-foreground mb-2 block text-sm font-medium'
                >
                  Payment Status
                </label>
                <Select
                  value={paymentStatusFilter}
                  onValueChange={setPaymentStatusFilter}
                >
                  <SelectTrigger id='payment-status'>
                    <SelectValue placeholder='All Statuses' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Statuses</SelectItem>
                    <SelectItem value='PENDING'>Pending</SelectItem>
                    <SelectItem value='PAID'>Paid</SelectItem>
                    <SelectItem value='FAILED'>Failed</SelectItem>
                    <SelectItem value='REFUNDED'>Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Button */}
              <Button
                variant='outline'
                onClick={handleResetFilters}
                className='bg-transparent md:w-auto'
              >
                <X className='mr-2 h-4 w-4' />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <div className='border-border bg-card overflow-hidden rounded-lg border'>
          <ScrollArea className='h-full w-full'>
            <Table>
              <TableHeader className='bg-muted/80'>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className='hover:bg-transparent'
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className={
                          header.id === 'orderNumber'
                            ? 'bg-muted/80 w-[140px] font-semibold whitespace-nowrap'
                            : 'bg-muted/80 font-semibold whitespace-nowrap'
                        }
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
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
                      className='h-40 text-center'
                    >
                      <div className='flex flex-col items-center justify-center gap-2'>
                        <p className='text-muted-foreground text-sm'>
                          No orders found
                        </p>
                        {(searchQuery ||
                          orderStatusFilter !== 'all' ||
                          paymentStatusFilter !== 'all') && (
                          <Button
                            variant='link'
                            size='sm'
                            onClick={handleResetFilters}
                          >
                            Clear filters
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className='group hover:bg-accent/50'>
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
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>

        {/* Pagination */}
        <Card className='border-border bg-card'>
          <CardContent className='flex flex-col items-center justify-between gap-4 p-4 sm:flex-row'>
            <div className='text-muted-foreground text-sm'>
              {isLoading ? (
                'Loading...'
              ) : (
                <>
                  <span className='hidden sm:inline'>Showing </span>
                  {orders.length} of {total}
                  <span className='hidden sm:inline'> orders</span>
                </>
              )}
            </div>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page <= 1}
              >
                <ChevronLeft className='h-4 w-4' />
                <span className='hidden sm:inline'>Previous</span>
              </Button>
              <div className='text-sm font-medium'>
                <span className='hidden sm:inline'>Page </span>
                {page}
                <span className='hidden sm:inline'> of {totalPages}</span>
                <span className='sm:hidden'>/{totalPages}</span>
              </div>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
              >
                <span className='hidden sm:inline'>Next</span>
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, orderId: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this order? This action cannot be
              undone and will permanently remove the order from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
            >
              Delete Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageContainer>
  );
}
