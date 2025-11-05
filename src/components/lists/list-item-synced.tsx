'use client';

import type { FC } from 'react';

import { ItemDescription } from '@/components/ui/item';

import { useLastSyncedAt } from './use-last-synced-at';

interface Props {
  lastSyncedAt: string | null;
}

export const ListItemSynced: FC<Props> = ({ lastSyncedAt }) => {
  const formattedDate = useLastSyncedAt(lastSyncedAt);

  return <ItemDescription>Last synced: {formattedDate}</ItemDescription>;
};
