import { createArrService } from '@/services/arr-service';
import type { Item } from '@/workflows/types';

export const addTagToMedia = async (
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
  await arrService.addTag(
    tagId,
    media.map(media => media.id),
  );
};
