import { deleteOldTags } from './steps/delete-old-tags';
import { fetchTags } from './steps/fetch-tags';
import { groupTags } from './steps/group-tags';
import { insertNewTags } from './steps/insert-new-tags';
import { revalidateCache } from './steps/revalidate-cache';
import { updateExistingTags } from './steps/update-existing-tags';

export const updateTags = async () => {
  'use workflow';

  const tags = await fetchTags();
  const { tagsToDelete, tagsToInsert, tagsToUpdate } = await groupTags(tags);
  const [deleted, inserted, updated] = await Promise.all([
    deleteOldTags(tagsToDelete),
    insertNewTags(tagsToInsert),
    updateExistingTags(tagsToUpdate),
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
