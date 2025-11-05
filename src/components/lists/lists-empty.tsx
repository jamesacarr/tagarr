import { FolderSync } from 'lucide-react';
import type { FC } from 'react';

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

import { RefreshListsButton } from './refresh-lists-button';

export const ListsEmpty: FC = () => (
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <FolderSync />
      </EmptyMedia>
      <EmptyTitle>No Synced Lists</EmptyTitle>
      <EmptyDescription>
        You haven&apos;t added any synced lists yet. Get started by adding your
        first synced list to Radarr.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <RefreshListsButton />
    </EmptyContent>
  </Empty>
);
