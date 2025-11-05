import { isEqual } from 'radash';

import { getAllLists } from '@/db/list/queries';
import type { List, NewList } from '@/db/list/types';

const areListsEqual = (existingList: List | undefined, newList: NewList) =>
  existingList &&
  isEqual(
    {
      description: existingList.description,
      id: existingList.id,
      name: existingList.name,
      slug: existingList.slug,
    },
    {
      description: newList.description,
      id: newList.id,
      name: newList.name,
      slug: newList.slug,
    },
  );

export const groupLists = async (lists: NewList[]) => {
  'use step';

  const existingLists = new Map(
    (await getAllLists()).map(list => [list.id, list]),
  );

  const listsToInsert = lists.filter(list => !existingLists.has(list.id));
  const listsToUpdate = lists.filter(
    list =>
      existingLists.has(list.id) &&
      !areListsEqual(existingLists.get(list.id), list),
  );
  const listsToDelete = [...existingLists.values()].filter(
    list => !lists.some(l => l.id === list.id),
  );

  return {
    listsToDelete,
    listsToInsert,
    listsToUpdate,
  };
};
