'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { UserDetailDialogProp } from '../types/admin-type';
import { useState } from 'react';
import { useUserDetail } from '@/hooks/use-api';

interface UserData {
  success: boolean;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    primaryEmail: string;
    imageUrl: string;
    hasImage: boolean;
    publicMetadata: {
      role: string;
      isPrimary?: boolean;
    };
  };
}

const UserDetailDialog = ({ adminUserId }: UserDetailDialogProp) => {
  const [isOpen, setIsOpen] = useState(false);

  const { data, error, isLoading, refetch } = useUserDetail(
    adminUserId,
    isOpen && !!adminUserId
  ) as {
    data: UserData | undefined;
    error: any;
    isLoading: boolean;
    refetch: () => void;
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const getRoleVariant = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'destructive';
      case 'moderator':
        return 'default';
      case 'user':
      default:
        return 'secondary';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant='ghost' size='sm' className='w-full text-xs'>
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-lg font-medium'>
            User Information
          </DialogTitle>
          <DialogDescription className='text-muted-foreground text-sm'>
            View user account details and information.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-6'>
          {isLoading && (
            <div className='flex items-center justify-center py-8'>
              <div className='border-primary h-4 w-4 animate-spin rounded-full border-2 border-r-transparent' />
              <span className='text-muted-foreground ml-2 text-sm'>
                Loading...
              </span>
            </div>
          )}

          {error && (
            <div className='border-destructive/20 bg-destructive/5 rounded-lg border p-4'>
              <div className='flex items-start gap-3'>
                <div className='bg-destructive/20 mt-0.5 h-4 w-4 rounded-full' />
                <div className='flex-1'>
                  <h4 className='text-destructive text-sm font-medium'>
                    Failed to load user details
                  </h4>
                  <p className='text-destructive/80 mt-1 text-xs'>
                    {error.message || 'Something went wrong'}
                  </p>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => refetch()}
                    className='mt-3 h-8 text-xs'
                  >
                    Try again
                  </Button>
                </div>
              </div>
            </div>
          )}

          {data?.success && data.data && !isLoading && (
            <div className='space-y-4'>
              {/* User Profile Header */}
              <div className='bg-card flex items-center gap-4 rounded-lg border p-4'>
                <Avatar className='h-12 w-12'>
                  <AvatarImage
                    src={data.data.imageUrl}
                    alt={`${data.data.firstName} ${data.data.lastName}`}
                    className='object-cover'
                  />
                  <AvatarFallback className='bg-muted text-sm font-medium'>
                    {data.data.firstName?.[0]?.toUpperCase() || '?'}
                    {data.data.lastName?.[0]?.toUpperCase() || ''}
                  </AvatarFallback>
                </Avatar>

                <div className='flex-1 space-y-1'>
                  <div className='flex items-center gap-2'>
                    <h3 className='font-medium'>
                      {data.data.firstName} {data.data.lastName}
                    </h3>
                    <div className='flex items-center gap-1'>
                      <Badge
                        variant={getRoleVariant(data.data.publicMetadata?.role)}
                        className='text-xs font-medium'
                      >
                        {data.data.publicMetadata?.role || 'User'}
                      </Badge>
                      {data.data.publicMetadata?.isPrimary && (
                        <Badge
                          variant='outline'
                          className='border-amber-200 bg-amber-50 text-xs font-medium text-amber-800'
                        >
                          Primary
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className='space-y-3'>
                <h4 className='text-foreground text-sm font-medium'>
                  Contact Information
                </h4>
                <div className='space-y-2'>
                  <div className='bg-muted/30 flex items-center justify-between rounded-md border px-3 py-2'>
                    <span className='text-muted-foreground text-sm'>Email</span>
                    <span className='font-mono text-sm'>
                      {data.data.primaryEmail || 'Not provided'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className='space-y-3'>
                <h4 className='text-foreground text-sm font-medium'>
                  Account Details
                </h4>

                <div className='space-y-2'>
                  <div className='bg-muted/30 flex items-center justify-between rounded-md border px-3 py-2'>
                    <span className='text-muted-foreground text-sm'>
                      First Name
                    </span>
                    <span className='text-sm'>
                      {data.data.firstName || 'Not provided'}
                    </span>
                  </div>
                  <div className='bg-muted/30 flex items-center justify-between rounded-md border px-3 py-2'>
                    <span className='text-muted-foreground text-sm'>
                      Last Name
                    </span>
                    <span className='text-sm'>
                      {data.data.lastName || 'Not provided'}
                    </span>
                  </div>
                  <div className='bg-muted/30 flex items-center justify-between rounded-md border px-3 py-2'>
                    <span className='text-muted-foreground text-sm'>Role</span>
                    <div className='flex items-center gap-2'>
                      <Badge
                        variant={getRoleVariant(data.data.publicMetadata?.role)}
                        className='text-xs font-medium'
                      >
                        {data.data.publicMetadata?.role || 'User'}
                      </Badge>
                      {data.data.publicMetadata?.isPrimary && (
                        <Badge
                          variant='outline'
                          className='border-amber-200 bg-amber-50 text-xs text-amber-600'
                        >
                          Primary
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className='gap-2'>
          <Button variant='outline' size='sm' onClick={() => setIsOpen(false)}>
            Close
          </Button>
          {data?.success && (
            <Button
              variant='default'
              size='sm'
              onClick={() => refetch()}
              disabled={isLoading}
            >
              Refresh
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailDialog;
