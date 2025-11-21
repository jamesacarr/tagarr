import { FolderSyncIcon } from 'lucide-react';
import type { FC } from 'react';

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

export const ListsEmpty: FC = () => (
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FolderSyncIcon />
      </EmptyMedia>
      <EmptyTitle>No Synced Lists</EmptyTitle>
      <EmptyDescription>
        You haven&apos;t added any synced lists yet. Get started by adding your
        first synced list to Radarr or Sonarr.
      </EmptyDescription>
    </EmptyHeader>
  </Empty>
);
