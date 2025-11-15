'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Globe, Archive } from 'lucide-react';

interface PublishSectionProps {
  onChange?: () => void;
}

export default function PublishSection({ onChange }: PublishSectionProps) {
  const [status, setStatus] = useState<'DRAFT' | 'ACTIVE' | 'ARCHIVED'>(
    'ACTIVE'
  );
  const [publishedAt] = useState('Nov 14, 2024');

  const statusConfig = {
    DRAFT: {
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
      label: 'Draft'
    },
    ACTIVE: {
      color:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      label: 'Active'
    },
    ARCHIVED: {
      color:
        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      label: 'Archived'
    }
  };

  const handleStatusChange = (newStatus: 'DRAFT' | 'ACTIVE' | 'ARCHIVED') => {
    setStatus(newStatus);
    onChange?.();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Publish</CardTitle>
        <CardDescription>Visibility and status</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <p className='mb-3 text-sm font-medium'>Status</p>
          <Badge className={`${statusConfig[status].color} mb-4`}>
            {statusConfig[status].label}
          </Badge>
        </div>

        <div className='space-y-2'>
          {(['DRAFT', 'ACTIVE', 'ARCHIVED'] as const).map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              className={`w-full rounded-lg border px-3 py-2 text-left transition-colors ${
                status === s
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-muted'
              }`}
            >
              <p className='text-sm font-medium'>{statusConfig[s].label}</p>
            </button>
          ))}
        </div>

        <div className='space-y-3 border-t pt-4'>
          <div className='flex items-center gap-2 text-sm'>
            <Calendar className='text-muted-foreground h-4 w-4' />
            <span className='text-muted-foreground'>Published</span>
          </div>
          <p className='text-sm font-medium'>{publishedAt}</p>
        </div>

        <div className='pt-2'>
          <Button variant='outline' size='sm' className='w-full gap-2'>
            <Globe className='h-4 w-4' />
            View Live
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
