import { updateList } from '@/db/list/queries';
import type { NewList } from '@/db/list/types';

export const updateExistingLists = async (lists: NewList[]) => {
  'use step';

  if (lists.length === 0) {
    return {
      count: 0,
      lists: [],
    };
  }

  const updatedLists = await Promise.all(
    lists.map(list => updateList(list.id, list)),
  );

  return {
    count: updatedLists.length,
    lists: updatedLists,
  };
};
