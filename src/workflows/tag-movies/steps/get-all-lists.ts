import { getAllSyncedLists } from '@/db/list/queries';
import { getListItems } from '@/services/mdblist';

export const getAllLists = async () => {
  'use step';

  const lists = await getAllSyncedLists();
  const filteredLists = lists.filter(
    list => list.url.startsWith('https://mdblist.com') && list.tags.length > 0,
  );

  const listsWithItems = await Promise.all(
    filteredLists.map(async list => {
      const items = await getListItems(list.url);
      const itemIds = items.map(item => item.id);
      return {
        id: list.id,
        itemIds,
        tags: list.tags,
      };
    }),
  );

  return listsWithItems;
};
