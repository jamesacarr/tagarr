import { logger } from '@/lib/logger';
import { createArrService } from '@/services/arr-service';
import { getListItems } from '@/services/mdblist';
import type { ListWithItems } from '@/workflows/types';

export const fetchLists = async (
  service: 'radarr' | 'sonarr',
  url: string,
  apiKey: string,
): Promise<ListWithItems[]> => {
  'use step';

  logger.info({ service }, 'Fetching lists');

  const arrService = createArrService(service, url, apiKey);
  const lists = await arrService.getLists();

  logger.debug({ lists }, 'Lists');

  const listsWithItems = await Promise.all(
    lists.map(async list => {
      logger.debug({ url: list.url }, 'Fetching list items');

      const items = await getListItems(list.url, service);
      const itemIds = items.map(item => item.id);
      return {
        id: list.id,
        itemIds,
        tags: list.tags,
      };
    }),
  );

  logger.debug({ listsWithItems }, 'Lists with items');

  return listsWithItems;
};
