import type { Grouped, Item } from '@/workflows/types';

import { addTagToSeries } from './steps/add-tag-to-series';
import { fetchLists } from './steps/fetch-lists';
import { fetchSeries } from './steps/fetch-series';
import { fetchTags } from './steps/fetch-tags';
import { groupSeries } from './steps/group-series';
import { removeTagFromSeries } from './steps/remove-tag-from-series';
import { validateSonarrConfig } from './steps/validate-sonarr-config';

export const tagSeries = async (): Promise<Grouped<Item>[]> => {
  'use workflow';

  const { apiKey, url } = await validateSonarrConfig();

  const [lists, series, tags] = await Promise.all([
    fetchLists(url, apiKey),
    fetchSeries(url, apiKey),
    fetchTags(url, apiKey),
  ]);
  const groupedSeries = await groupSeries(series, lists, tags);

  for (const { added, removed, tag } of groupedSeries) {
    await addTagToSeries(url, apiKey, tag.id, added.items);
    await removeTagFromSeries(url, apiKey, tag.id, removed.items);
  }

  return groupedSeries;
};
