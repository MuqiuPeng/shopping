import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SerializedOrder } from '@/repositories/order/order.type';
import {
  ArrowLeft,
  DollarSign,
  Edit,
  FileText,
  MapPin,
  Package,
  ShoppingCart
} from 'lucide-react';
import React from 'react';
import { OrderStatusBadge } from '../component/order-status-badge';
import { PaymentStatusBadge } from '../component/payment-status-badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';

interface OrderDetailViewProps {
  id: string;
  order: SerializedOrder;
}

const OrderDetailView = ({ id, order }: OrderDetailViewProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // ⚠️ Data mapping notes:
  // - order.order_items exists in API response (mapped to order.items in type)
  // - order.customers.email exists ✅
  // - order.customers.firstName, lastName, username exist but may be null ⚠️
  // - order.customers.phone exists but may be null ⚠️
  // - order.coupons.code would need to exist if coupon is applied ⚠️

  // Derived customer name (fallback chain: fullName > username > email)
  const customerName =
    order.customers?.firstName && order.customers?.lastName
      ? `${order.customers.firstName} ${order.customers.lastName}`
      : order.customers?.firstName ||
        order.customers?.lastName ||
        order.customers?.username ||
        order.customers?.email ||
        'Unknown Customer';

  const customerEmail = order.customers?.email || '—';
  const customerPhone = order.customers?.phone || order.shippingPhone; // Fallback to shipping phone
  const couponCode = order.coupons?.code || null;

  return (
    <PageContainer scrollable>
      <div className='bg-background min-h-screen w-full p-6'>
        <div className='space-y-6'>
          {/* Header */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Button variant='ghost' size='icon' asChild>
                <Link href='/dashboard/order'>
                  <ArrowLeft className='h-5 w-5' />
                </Link>
              </Button>
              <div>
                <h1 className='text-2xl font-semibold tracking-tight'>
                  {order.orderNumber}
                </h1>
                <div className='mt-1 flex items-center gap-3'>
                  <OrderStatusBadge status={order.status} />
                  <PaymentStatusBadge status={order.paymentStatus} />
                </div>
              </div>
            </div>
            <Button asChild>
              <Link href={`/dashboard/order/${order.id}/edit`}>
                <Edit className='mr-2 h-4 w-4' />
                Edit Order
              </Link>
            </Button>
          </div>

          <div className='grid gap-6 lg:grid-cols-3'>
            {/* Left Column */}
            <div className='space-y-6 lg:col-span-2'>
              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 text-lg'>
                    <ShoppingCart className='h-5 w-5' />
                    Order Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[80px]'>Image</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Variant</TableHead>
                        <TableHead className='text-right'>Qty</TableHead>
                        <TableHead className='text-right'>Price</TableHead>
                        <TableHead className='text-right'>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.order_items?.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className='border-border bg-accent relative h-16 w-16 overflow-hidden rounded-md border'>
                              <Image
                                src={item.productImage || '/placeholder.svg'}
                                alt={item.productName}
                                fill
                                className='object-cover'
                                sizes='64px'
                              />
                            </div>
                          </TableCell>
                          <TableCell className='font-medium'>
                            {item.productName}
                          </TableCell>
                          <TableCell className='text-muted-foreground'>
                            {item.variantName || '—'}
                          </TableCell>
                          <TableCell className='text-right tabular-nums'>
                            {item.quantity}
                          </TableCell>
                          <TableCell className='text-right tabular-nums'>
                            {formatCurrency(item.price)}
                          </TableCell>
                          <TableCell className='text-right font-medium tabular-nums'>
                            {formatCurrency(item.total)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 text-lg'>
                    <MapPin className='h-5 w-5' />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='grid gap-4 sm:grid-cols-2'>
                    <div>
                      <label className='text-muted-foreground text-sm font-medium'>
                        Full Name
                      </label>
                      <p className='mt-1 text-base'>{order.shippingFullName}</p>
                    </div>
                    <div>
                      <label className='text-muted-foreground text-sm font-medium'>
                        Phone
                      </label>
                      <p className='mt-1 text-base'>{order.shippingPhone}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <label className='text-muted-foreground text-sm font-medium'>
                      Address
                    </label>
                    <div className='mt-1 space-y-1'>
                      <p className='text-base'>{order.shippingAddressLine1}</p>
                      {order.shippingAddressLine2 && (
                        <p className='text-base'>
                          {order.shippingAddressLine2}
                        </p>
                      )}
                      <p className='text-base'>
                        {order.shippingCity}, {order.shippingState}{' '}
                        {order.shippingPostalCode}
                      </p>
                      <p className='text-base'>{order.shippingCountry}</p>
                    </div>
                  </div>

                  {(order.trackingNumber ||
                    order.shippedAt ||
                    order.deliveredAt) && (
                    <>
                      <Separator />
                      <div className='grid gap-4 sm:grid-cols-2'>
                        {order.trackingNumber && (
                          <div>
                            <label className='text-muted-foreground text-sm font-medium'>
                              Tracking Number
                            </label>
                            <p className='mt-1 font-mono text-sm'>
                              {order.trackingNumber}
                            </p>
                          </div>
                        )}
                        {order.shippedAt && (
                          <div>
                            <label className='text-muted-foreground text-sm font-medium'>
                              Shipped At
                            </label>
                            <p className='mt-1 text-sm'>
                              {formatDate(order.shippedAt)}
                            </p>
                          </div>
                        )}
                        {order.deliveredAt && (
                          <div>
                            <label className='text-muted-foreground text-sm font-medium'>
                              Delivered At
                            </label>
                            <p className='mt-1 text-sm'>
                              {formatDate(order.deliveredAt)}
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Notes */}
              {(order.customerNote || order.adminNote) && (
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2 text-lg'>
                      <FileText className='h-5 w-5' />
                      Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    {order.customerNote && (
                      <div>
                        <label className='text-muted-foreground text-sm font-medium'>
                          Customer Note
                        </label>
                        <p className='bg-accent mt-1 rounded-md p-3 text-sm'>
                          {order.customerNote}
                        </p>
                      </div>
                    )}
                    {order.adminNote && (
                      <div>
                        <label className='text-muted-foreground text-sm font-medium'>
                          Admin Note
                        </label>
                        <p className='bg-primary/10 border-primary/20 mt-1 rounded-md border p-3 text-sm'>
                          {order.adminNote}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column */}
            <div className='space-y-6'>
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 text-lg'>
                    <Package className='h-5 w-5' />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <div className='space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted-foreground'>
                        Order Number
                      </span>
                      <span className='font-mono font-medium'>
                        {order.orderNumber}
                      </span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted-foreground'>
                        Order Status
                      </span>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted-foreground'>
                        Payment Status
                      </span>
                      <PaymentStatusBadge status={order.paymentStatus} />
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted-foreground'>
                        Payment Method
                      </span>
                      <span className='font-medium'>
                        {order.paymentMethod || '—'}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className='space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted-foreground'>Created At</span>
                      <span className='text-sm'>
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted-foreground'>Updated At</span>
                      <span className='text-sm'>
                        {formatDate(order.updatedAt)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2 text-lg'>
                    <DollarSign className='h-5 w-5' />
                    Pricing Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <div className='space-y-2'>
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted-foreground'>Subtotal</span>
                      <span className='tabular-nums'>
                        {formatCurrency(order.subtotal)}
                      </span>
                    </div>
                    {order.discount > 0 && (
                      <div className='flex justify-between text-sm'>
                        <span className='text-muted-foreground'>Discount</span>
                        <span className='text-success tabular-nums'>
                          -{formatCurrency(order.discount)}
                        </span>
                      </div>
                    )}
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted-foreground'>
                        Shipping Cost
                      </span>
                      <span className='tabular-nums'>
                        {order.shippingCost > 0 ? (
                          formatCurrency(order.shippingCost)
                        ) : (
                          <span className='text-success font-medium'>FREE</span>
                        )}
                      </span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span className='text-muted-foreground'>Tax</span>
                      <span className='tabular-nums'>
                        {formatCurrency(order.tax)}
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className='flex justify-between text-lg font-semibold'>
                    <span>Total</span>
                    <span className='tabular-nums'>
                      {formatCurrency(order.total)}
                    </span>
                  </div>

                  {couponCode && (
                    <>
                      <Separator />
                      <div className='bg-accent rounded-md p-3'>
                        <div className='text-muted-foreground mb-2 text-xs font-medium'>
                          Coupon Applied
                        </div>
                        <div className='flex items-center justify-between'>
                          <code className='bg-background rounded px-2 py-1 font-mono text-sm'>
                            {couponCode}
                          </code>
                          <span className='text-success text-sm font-medium'>
                            -{formatCurrency(order.discount)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className='text-lg'>Customer</CardTitle>
                </CardHeader>
                <CardContent className='space-y-3'>
                  <div>
                    <label className='text-muted-foreground text-sm font-medium'>
                      Name
                    </label>
                    <p className='mt-1 text-base font-medium'>{customerName}</p>
                  </div>
                  <div>
                    <label className='text-muted-foreground text-sm font-medium'>
                      Email
                    </label>
                    <p className='mt-1 text-sm'>{customerEmail}</p>
                  </div>
                  <div>
                    <label className='text-muted-foreground text-sm font-medium'>
                      Phone
                    </label>
                    <p className='mt-1 text-sm'>{customerPhone}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default OrderDetailView;
