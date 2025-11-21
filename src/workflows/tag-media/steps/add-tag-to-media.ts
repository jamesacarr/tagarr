import { logger } from '@/lib/logger';
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

  logger.info({ service, tagId }, 'Adding tag to media');

  const mediaIds = media.map(media => media.id);
  logger.debug({ mediaIds, service, tagId }, 'Media IDs to add');

  const arrService = createArrService(service, url, apiKey);
  await arrService.addTag(tagId, mediaIds);
};
