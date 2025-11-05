import { deleteOldLists } from './steps/delete-old-lists';
import { fetchLists } from './steps/fetch-lists';
import { groupLists } from './steps/group-lists';
import { insertNewLists } from './steps/insert-new-lists';
import { revalidateCache } from './steps/revalidate-cache';
import { updateExistingLists } from './steps/update-existing-lists';

export const updateLists = async () => {
  'use workflow';

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
