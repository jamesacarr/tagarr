import { title } from 'radash';
import type { FC } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ItemGroup, ItemSeparator } from '@/components/ui/item';

import { ListItem } from './list-item';
import type { List } from './types';

interface Props {
  service: 'radarr' | 'sonarr';
  lists: List[];
}

export const ListsGroup: FC<Props> = ({ service, lists }) => {
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>{title(service)} Lists</CardTitle>
        <CardDescription>
          All MDBList Import Lists configured for {title(service)}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {lists.map((list, index) => (
            <li className="list-none" key={list.id}>
              <ListItem list={list} />
              {index < lists.length - 1 && <ItemSeparator />}
            </li>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
};
