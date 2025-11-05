'use client';

import type { FC } from 'react';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { refreshLists } from '@/db/list/refresh-lists';

export const RefreshListsButton: FC = () => {
  const [isPending, startTransition] = useTransition();

  const onRefresh = () => {
    startTransition(async () => {
      const success = await refreshLists();
      if (!success) {
        toast.error('Failed to refresh lists');
      }
    });
  };

  return (
    <Button disabled={isPending} onClick={onRefresh} variant="outline">
      {isPending ? <Spinner className="animate-spin" /> : 'Refresh'}
    </Button>
  );
};
