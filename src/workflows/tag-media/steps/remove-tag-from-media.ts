import { logger } from '@/lib/logger';
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

  logger.info({ service, tagId }, 'Removing tag from media');

  const mediaIds = media.map(media => media.id);
  logger.debug({ mediaIds, service, tagId }, 'Media IDs to remove');

  const arrService = createArrService(service, url, apiKey);
  await arrService.removeTag(tagId, mediaIds);
};
