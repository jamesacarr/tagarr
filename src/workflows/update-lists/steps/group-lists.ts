import { isEqual } from 'radash';

import { getAllLists } from '@/db/list/queries';
import type { ListWithTags, NewListWithTags } from '@/db/list/types';

const areListsEqual = (
  existingList: ListWithTags | undefined,
  newList: NewListWithTags,
) =>
  existingList &&
  isEqual(
    {
      enabled: existingList.enabled,
      id: existingList.id,
      name: existingList.name,
      tag_ids: existingList.tags.map(tag => tag.id),
      url: existingList.url,
    },
    {
      enabled: newList.enabled,
      id: newList.id,
      name: newList.name,
      tag_ids: newList.tag_ids,
      url: newList.url,
    },
  );

export const groupLists = async (lists: NewListWithTags[]) => {
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
