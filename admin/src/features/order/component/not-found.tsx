import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-2xl font-semibold'>Order not found</h1>
        <p className='text-muted-foreground mt-2'>
          The order you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild className='mt-4'>
          <Link href='/dashboard/order'>Back to Orders</Link>
        </Button>
      </div>
    </div>
  );
}
