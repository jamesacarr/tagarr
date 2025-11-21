import { ExternalLinkIcon } from 'lucide-react';
import type { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';

import type { List } from './types';

interface Props {
  list: List;
}

export const ListItem: FC<Props> = ({ list }) => (
  <Item asChild>
    <a
      aria-label={list.name}
      href={list.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <ItemContent>
        <ItemTitle>
          {list.name}{' '}
          {list.tags.map(tag => (
            <Badge key={tag.id}>{tag.label}</Badge>
          ))}
        </ItemTitle>
        <ItemDescription></ItemDescription>
      </ItemContent>
      <ItemActions>
        <ExternalLinkIcon className="size-4" />
      </ItemActions>
    </a>
  </Item>
);
