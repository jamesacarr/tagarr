import { updateList } from '@/db/list/queries';
import type { NewListWithTags } from '@/db/list/types';
import { deleteListsTags, insertListsTags } from '@/db/lists-tags/queries';

export const updateExistingLists = async (lists: NewListWithTags[]) => {
  'use step';

  if (lists.length === 0) {
    return {
      count: 0,
      lists: [],
    };
  }

  // Update the existing lists
  const updatedLists = await Promise.all(
    lists.map(({ tag_ids: _, ...list }) => updateList(list.id, list)),
  );

  // Delete the old many-to-many relationship between lists and tags
  await Promise.all(lists.map(list => deleteListsTags(list.id, list.tag_ids)));

  // Insert the new many-to-many relationship between lists and tags
  const newListsTags = lists.flatMap(list =>
    list.tag_ids.map(tagId => ({ list_id: list.id, tag_id: tagId })),
  );
  await insertListsTags(newListsTags);

  return {
    count: updatedLists.length,
    lists: updatedLists,
  };
};
