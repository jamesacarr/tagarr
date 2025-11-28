import { getStepMetadata } from 'workflow';

import { createLogger } from '@/lib/logger';
import { createArrService } from '@/services/arr-service';
import { getListItems } from '@/services/mdblist';
import type { ListWithItems } from '@/workflows/types';

const log = createLogger('[Workflow/TagMedia/FetchLists]');

export const fetchLists = async (
  service: 'radarr' | 'sonarr',
  url: string,
  apiKey: string,
): Promise<ListWithItems[]> => {
  'use step';

  const context = getStepMetadata();

  log.info({ context, service }, 'Starting');

  const arrService = createArrService(service, url, apiKey);
  const lists = await arrService.getListsWithTags();

  log.debug({ context, lists, service }, 'Lists');

  const listsWithItems = await Promise.all(
    lists.map(async list => {
      log.debug({ context, service, url: list.url }, 'Fetching list items');

      const items = await getListItems(list.url, service);
      const itemIds = items.map(item => item.id);

      log.debug(
        { context, itemIds, service, url: list.url },
        'Fetched list items',
      );

      return {
        id: list.id,
        itemIds,
        tags: list.tags,
      };
    }),
  );

  log.debug({ context, listsWithItems, service }, 'Lists with items');
  log.info({ context, service }, 'Finished');

  return listsWithItems;
};
