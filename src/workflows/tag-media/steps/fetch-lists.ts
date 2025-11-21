import { createArrService } from '@/services/arr-service';
import { getListItems } from '@/services/mdblist';
import type { ListWithItems } from '@/workflows/types';

export const fetchLists = async (
  service: 'radarr' | 'sonarr',
  url: string,
  apiKey: string,
): Promise<ListWithItems[]> => {
  'use step';

  const arrService = createArrService(service, url, apiKey);
  const lists = await arrService.getLists();

  const listsWithItems = await Promise.all(
    lists.map(async list => {
      const items = await getListItems(list.url, service);
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
