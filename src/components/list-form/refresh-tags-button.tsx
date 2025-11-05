'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { refreshTags } from '@/db/tag/refresh-tags';

export const RefreshTagsButton = () => {
  const [isPending, startTransition] = useTransition();

  const onRefresh = () => {
    startTransition(async () => {
      const success = await refreshTags();
      if (!success) {
        toast.error('Failed to refresh tags');
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={onRefresh}
      type="button"
      variant="outline"
    >
      {isPending ? <Spinner /> : 'Refresh Tags'}
    </Button>
  );
};
