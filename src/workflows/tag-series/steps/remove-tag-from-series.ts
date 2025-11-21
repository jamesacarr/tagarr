import { removeTag } from '@/services/sonarr/remove-tag';
import type { Item } from '@/workflows/types';

export const removeTagFromSeries = async (
  url: string,
  apiKey: string,
  tagId: number,
  series: Item[],
): Promise<void> => {
  'use step';

  if (series.length === 0) {
    return;
  }

  await removeTag(
    url,
    apiKey,
    tagId,
    series.map(series => series.id),
  );
};
