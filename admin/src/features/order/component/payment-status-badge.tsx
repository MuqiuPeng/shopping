import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

export function PaymentStatusBadge({
  status,
  className
}: PaymentStatusBadgeProps) {
  const variants = {
    PENDING: 'bg-warning/10 text-warning border-warning/20',
    PAID: 'bg-success/10 text-success border-success/20',
    FAILED: 'bg-destructive/10 text-destructive border-destructive/20',
    REFUNDED: 'bg-muted text-muted-foreground border-border'
  };

  return (
    <Badge variant='outline' className={cn(variants[status], className)}>
      {status}
    </Badge>
  );
}
