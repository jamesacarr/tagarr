import { insertLists } from '@/db/list/queries';
import type { NewList } from '@/db/list/types';

export const insertNewLists = async (lists: NewList[]) => {
  'use step';

  if (lists.length === 0) {
    return {
      count: 0,
      lists: [],
    };
  }

  const newLists = await insertLists(lists);

  return {
    count: newLists.length,
    lists: newLists,
  };
};
