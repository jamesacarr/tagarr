import { getListUrl } from '@/lib/get-list-url';
import { getListItems } from '@/services/mdblist';
import { getLists } from '@/services/sonarr';
import type { ListWithItems } from '@/workflows/types';

export const fetchLists = async (
  url: string,
  apiKey: string,
): Promise<ListWithItems[]> => {
  'use step';

  const lists = await getLists(url, apiKey);
  const filteredLists = lists
    .map(list => ({
      id: list.id,
      tags: list.tags,
      url: getListUrl(list),
    }))
    .filter(
      list =>
        list.url?.startsWith('https://mdblist.com') && list.tags.length > 0,
    );

  const listsWithItems = await Promise.all(
    filteredLists.map(async list => {
      // biome-ignore lint/style/noNonNullAssertion: url will always be set, TS just doesn't recognise that
      const items = await getListItems(list.url!, 'Sonarr');
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
