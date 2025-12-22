'use client';

import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
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
import {
  ChevronDown,
  Download,
  MoreVertical,
  Plus,
  RefreshCw,
  Search
} from 'lucide-react';
import { useState } from 'react';
import useCoupon from '../hook/use-coupon';

const coupons = [
  {
    id: 1,
    name: 'Summer Sale 2024',
    code: 'SUMMER2024',
    type: 'Percentage',
    status: 'active',
    validFrom: '2024-06-01',
    validTo: '2024-08-31',
    issued: 1500,
    used: 850
  },
  {
    id: 2,
    name: 'New Customer Welcome',
    code: 'WELCOME10',
    type: 'Amount',
    status: 'active',
    validFrom: '2024-01-01',
    validTo: '2024-12-31',
    issued: 5000,
    used: 3200
  },
  {
    id: 3,
    name: 'Black Friday Mega Deal',
    code: 'BFRIDAY50',
    type: 'Percentage',
    status: 'expired',
    validFrom: '2023-11-24',
    validTo: '2023-11-27',
    issued: 10000,
    used: 9500
  },
  {
    id: 4,
    name: 'Spring Clearance',
    code: 'SPRING25',
    type: 'Percentage',
    status: 'disabled',
    validFrom: '2024-03-01',
    validTo: '2024-05-31',
    issued: 2000,
    used: 450
  },
  {
    id: 5,
    name: 'VIP Exclusive Offer',
    code: 'VIP100',
    type: 'Amount',
    status: 'draft',
    validFrom: '2024-09-01',
    validTo: '2024-09-30',
    issued: 0,
    used: 0
  }
];

const CouponListView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const {
    items,
    isLoading,
    createCoupon,
    isCreating,
    createError,
    updateCoupon,
    isUpdating,
    updateError,
    toggleStatus,
    isToggling
  } = useCoupon({ page: 1 });

  console.log({ items });

  const calculateUsageRate = (used: number, issued: number) => {
    if (issued === 0) return 0;
    return (used / issued) * 100;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      {
        variant: 'default' | 'secondary' | 'destructive' | 'outline';
        className: string;
      }
    > = {
      active: {
        variant: 'default',
        className: 'bg-success text-success-foreground'
      },
      draft: {
        variant: 'secondary',
        className: 'bg-muted text-muted-foreground'
      },
      expired: {
        variant: 'outline',
        className: 'border-muted-foreground/50 text-muted-foreground'
      },
      disabled: {
        variant: 'destructive',
        className: 'bg-destructive/20 text-destructive'
      }
    };
    return variants[status] || variants.draft;
  };

  return (
    <PageContainer scrollable={false}>
      <div className='w-full overflow-auto'>
        {/* Header */}
        <div className='mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between'>
          <div>
            <h1 className='text-foreground text-2xl font-bold text-balance md:text-3xl'>
              Coupon Management
            </h1>
            <p className='text-muted-foreground mt-1 text-sm'>
              Manage all coupons and their lifecycle
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              className='hidden bg-transparent sm:flex'
            >
              <Download className='mr-2 h-4 w-4' />
              Export
            </Button>
            <Button
              variant='outline'
              size='sm'
              className='hidden bg-transparent sm:flex'
            >
              <RefreshCw className='mr-2 h-4 w-4' />
              Refresh
            </Button>
            <Button
              size='sm'
              onClick={() => setIsCreateModalOpen(true)}
              className='flex-1 sm:flex-none'
            >
              <Plus className='mr-2 h-4 w-4' />
              <span className='hidden sm:inline'>Create Coupon</span>
              <span className='sm:hidden'>Create</span>
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <div className='border-border bg-card mb-6 rounded-lg border p-4'>
          <div className='flex items-center justify-between'>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className='text-foreground flex items-center gap-2 text-sm font-medium'
            >
              Filters
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`}
              />
            </button>
            {showFilters && (
              <div className='flex gap-2'>
                <Button variant='outline' size='sm'>
                  Apply
                </Button>
                <Button variant='ghost' size='sm'>
                  Reset
                </Button>
              </div>
            )}
          </div>
          {showFilters && (
            <div className='mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3'>
              <div className='relative'>
                <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
                <Input
                  placeholder='Search by name or code...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-9'
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder='Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Status</SelectItem>
                  <SelectItem value='draft'>Draft</SelectItem>
                  <SelectItem value='active'>Active</SelectItem>
                  <SelectItem value='expired'>Expired</SelectItem>
                  <SelectItem value='disabled'>Disabled</SelectItem>
                </SelectContent>
              </Select>
              <Input type='date' placeholder='Date range' />
            </div>
          )}
        </div>

        {/* Table */}
        <div className='border-border bg-card overflow-x-auto rounded-lg border'>
          <Table>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead className='font-semibold whitespace-nowrap'>
                  Coupon Name
                </TableHead>
                <TableHead className='font-semibold whitespace-nowrap'>
                  Coupon Code
                </TableHead>
                <TableHead className='font-semibold whitespace-nowrap'>
                  Type
                </TableHead>
                <TableHead className='font-semibold whitespace-nowrap'>
                  Status
                </TableHead>
                <TableHead className='font-semibold whitespace-nowrap'>
                  Valid Period
                </TableHead>
                <TableHead className='text-right font-semibold whitespace-nowrap'>
                  Issued
                </TableHead>
                <TableHead className='text-right font-semibold whitespace-nowrap'>
                  Used
                </TableHead>
                <TableHead className='font-semibold whitespace-nowrap'>
                  Usage Rate
                </TableHead>
                <TableHead className='text-right font-semibold whitespace-nowrap'>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => {
                const usageRate = calculateUsageRate(
                  coupon.used,
                  coupon.issued
                );
                const statusBadge = getStatusBadge(coupon.status);
                return (
                  <TableRow key={coupon.id} className='group'>
                    <TableCell className='text-foreground font-medium whitespace-nowrap'>
                      {coupon.name}
                    </TableCell>
                    <TableCell className='text-muted-foreground font-mono text-sm whitespace-nowrap'>
                      {coupon.code}
                    </TableCell>
                    <TableCell className='text-foreground whitespace-nowrap'>
                      {coupon.type}
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      <Badge
                        variant={statusBadge.variant}
                        className={statusBadge.className}
                      >
                        {coupon.status}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-muted-foreground text-sm whitespace-nowrap'>
                      {coupon.validFrom} → {coupon.validTo}
                    </TableCell>
                    <TableCell className='text-foreground text-right whitespace-nowrap'>
                      {coupon.issued.toLocaleString()}
                    </TableCell>
                    <TableCell className='text-foreground text-right whitespace-nowrap'>
                      {coupon.used.toLocaleString()}
                    </TableCell>
                    <TableCell className='whitespace-nowrap'>
                      <div className='flex items-center gap-2'>
                        <Progress value={usageRate} className='h-2 w-24' />
                        <span className='text-muted-foreground text-xs'>
                          {usageRate.toFixed(0)}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className='text-right whitespace-nowrap'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='h-8 w-8 p-0'
                          >
                            <MoreVertical className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Disable</DropdownMenuItem>
                          <DropdownMenuItem>View Usage</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className='mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-muted-foreground text-xs sm:text-sm'>
            Showing 1 to 5 of 5 coupons
          </p>
          <div className='flex gap-2'>
            <Button variant='outline' size='sm' disabled>
              Previous
            </Button>
            <Button variant='outline' size='sm' disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CouponListView;
