import { insertLists } from '@/db/list/queries';
import type { NewListWithTags } from '@/db/list/types';
import { insertListsTags } from '@/db/lists-tags/queries';

export const insertNewLists = async (lists: NewListWithTags[]) => {
  'use step';

  if (lists.length === 0) {
    return {
      count: 0,
      lists: [],
    };
  }

  // Insert the new lists
  const listsWithoutTags = lists.map(list => {
    const { tag_ids: _, ...rest } = list;
    return rest;
  });
  const newLists = await insertLists(listsWithoutTags);

  // Insert the new many-to-many relationship between lists and tags
  const newListsTags = lists.flatMap(list =>
    list.tag_ids.map(tagId => ({ list_id: list.id, tag_id: tagId })),
  );
  await insertListsTags(newListsTags);

  return {
    count: newLists.length,
    lists: newLists,
  };
};
