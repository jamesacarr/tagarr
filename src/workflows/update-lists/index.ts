import { deleteOldLists } from './steps/delete-old-lists';
import { deleteOldTags } from './steps/delete-old-tags';
import { fetchLists } from './steps/fetch-lists';
import { fetchTags } from './steps/fetch-tags';
import { groupLists } from './steps/group-lists';
import { groupTags } from './steps/group-tags';
import { insertNewLists } from './steps/insert-new-lists';
import { insertNewTags } from './steps/insert-new-tags';
import { revalidateCache } from './steps/revalidate-cache';
import { updateExistingLists } from './steps/update-existing-lists';
import { updateExistingTags } from './steps/update-existing-tags';

export const updateLists = async () => {
  'use workflow';

  // Update tags first
  const tags = await fetchTags();
  const { tagsToDelete, tagsToInsert, tagsToUpdate } = await groupTags(tags);
  await Promise.all([
    deleteOldTags(tagsToDelete),
    insertNewTags(tagsToInsert),
    updateExistingTags(tagsToUpdate),
  ]);

  // Next we update the lists
  const lists = await fetchLists();
  const { listsToDelete, listsToInsert, listsToUpdate } =
    await groupLists(lists);
  const [deleted, inserted, updated] = await Promise.all([
    deleteOldLists(listsToDelete),
    insertNewLists(listsToInsert),
    updateExistingLists(listsToUpdate),
  ]);

  if (deleted.count > 0 || inserted.count > 0 || updated.count > 0) {
    await revalidateCache();
  }

  return {
    deleted,
    inserted,
    updated,
  };
};
