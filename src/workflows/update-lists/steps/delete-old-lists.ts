import { deleteLists } from '@/db/list/queries';
import type { List } from '@/db/list/types';

export const deleteOldLists = async (lists: List[]) => {
  'use step';

  if (lists.length === 0) {
    return {
      count: 0,
      lists: [],
    };
  }

  const deletedLists = await deleteLists(lists.map(list => list.id));

  return {
    count: deletedLists.length,
    lists: deletedLists,
  };
};
