import type { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import { Item, ItemContent, ItemTitle } from '@/components/ui/item';
import type { ListWithTags } from '@/db/list/types';

import { ListItemSynced } from './list-item-synced';

interface Props {
  list: ListWithTags;
}

export const ListItem: FC<Props> = ({ list }) => (
  <Item variant="outline">
    <ItemContent>
      <ItemTitle>
        {list.name}{' '}
        {list.tags.map(tag => (
          <Badge key={tag.id}>{tag.label}</Badge>
        ))}
      </ItemTitle>
      <ListItemSynced lastSyncedAt={list.last_synced_at} />
    </ItemContent>
  </Item>
);
