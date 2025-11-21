import { createArrService } from '@/services/arr-service';
import type { Item } from '@/workflows/types';

export const removeTagFromMedia = async (
  service: 'radarr' | 'sonarr',
  url: string,
  apiKey: string,
  tagId: number,
  media: Item[],
): Promise<void> => {
  'use step';

  if (media.length === 0) {
    return;
  }

  const arrService = createArrService(service, url, apiKey);
  await arrService.removeTag(
    tagId,
    media.map(media => media.id),
  );
};
