import { getSeries } from '@/services/sonarr';
import type { Item, WithTags } from '@/workflows/types';

export const fetchSeries = async (
  url: string,
  apiKey: string,
): Promise<WithTags<Item>[]> => {
  'use step';

  const series = await getSeries(url, apiKey);
  return series.map(series => ({
    id: series.id,
    tags: series.tags,
    title: series.title,
    tmdbId: series.tmdbId,
  }));
};
