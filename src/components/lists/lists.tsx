import { group } from 'radash';
import type { FC } from 'react';

import { ListsEmpty } from './lists-empty';
import { ListsGroup } from './lists-group';
import type { List } from './types';

interface Props {
  lists: List[];
}

export const Lists: FC<Props> = ({ lists }) => {
  if (lists.length === 0) {
    return <ListsEmpty />;
  }

  const listsByService = group(lists, list => list.service);

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      {Object.entries(listsByService).map(([service, lists]) => (
        <ListsGroup
          key={service}
          lists={lists}
          service={service as 'radarr' | 'sonarr'}
        />
      ))}
    </div>
  );
};
