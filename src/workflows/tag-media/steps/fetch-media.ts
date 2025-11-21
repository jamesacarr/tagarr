import { logger } from '@/lib/logger';
import { createArrService } from '@/services/arr-service';
import type { Item, WithTags } from '@/workflows/types';

export const fetchMedia = async (
  service: 'radarr' | 'sonarr',
  url: string,
  apiKey: string,
): Promise<WithTags<Item>[]> => {
  'use step';

  logger.info({ service }, 'Fetching media');

  const arrService = createArrService(service, url, apiKey);
  const media = await arrService.getMedia();
  return media.map(media => ({
    id: media.id,
    tags: media.tags,
    title: media.title,
    tmdbId: media.tmdbId,
  }));
};
