import Link from 'next/link';
import type { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from '@/components/ui/item';
import type { ListWithTag } from '@/db/list/types';

import { ListItemSynced } from './list-item-synced';

interface Props {
  list: ListWithTag;
}

export const ListItem: FC<Props> = ({ list }) => (
  <Item variant="outline">
    <ItemContent>
      <ItemTitle>
        {list.name} {list.tag_label && <Badge>{list.tag_label}</Badge>}
      </ItemTitle>
      <ListItemSynced lastSyncedAt={list.last_synced_at} />
    </ItemContent>
    <ItemActions>
      <Button asChild size="sm" variant="outline">
        <Link href={`/${list.id}`}>Edit</Link>
      </Button>
    </ItemActions>
  </Item>
);
