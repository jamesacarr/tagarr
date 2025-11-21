import { addTag } from '@/services/sonarr';
import type { Item } from '@/workflows/types';

export const addTagToSeries = async (
  url: string,
  apiKey: string,
  tagId: number,
  series: Item[],
): Promise<void> => {
  'use step';

  if (series.length === 0) {
    return;
  }

  await addTag(
    url,
    apiKey,
    tagId,
    series.map(series => series.id),
  );
};
