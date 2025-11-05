import type { FC } from 'react';

import type { ListWithTag } from '@/db/list/types';

import { ListItem } from './list-item';
import { ListsEmpty } from './lists-empty';
import { RefreshListsButton } from './refresh-lists-button';

interface Props {
  lists: ListWithTag[];
}

export const Lists: FC<Props> = ({ lists }) => {
  if (lists.length === 0) {
    return <ListsEmpty />;
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      {lists.map(list => (
        <ListItem key={list.id} list={list} />
      ))}
      <RefreshListsButton />
    </div>
  );
};
