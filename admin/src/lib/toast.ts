import { toast } from 'sonner';
import { success } from 'zod';

export const onToast = (successMessage: string) => {
  toast.success(successMessage, {
    style: {
      background: 'var(--primary)',
      color: 'var(--primary-foreground)',
      border: '1px solid var(--primary)'
    }
  });
};

export const onToastError = (errorMessage?: string, description?: string) => {
  toast.error(errorMessage ?? 'Error', {
    description: description ?? 'Something is wrong. Please try again.',
    style: {
      background: 'oklch(0.577 0.245 27.325)',
      color: 'white',
      border: '1px solid oklch(0.577 0.245 27.325)'
    }
  });
};
