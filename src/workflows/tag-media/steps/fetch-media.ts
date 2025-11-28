import { getStepMetadata } from 'workflow';

import { createLogger } from '@/lib/logger';
import { createArrService } from '@/services/arr-service';
import type { Item, WithTags } from '@/workflows/types';

const log = createLogger('[Workflow/TagMedia/FetchMedia]');

export const fetchMedia = async (
  service: 'radarr' | 'sonarr',
  url: string,
  apiKey: string,
): Promise<WithTags<Item>[]> => {
  'use step';

  const context = getStepMetadata();

  log.info({ context, service }, 'Starting');

  const arrService = createArrService(service, url, apiKey);
  const media = await arrService.getMedia();
  const formattedMedia = media.map(media => ({
    id: media.id,
    tags: media.tags,
    title: media.title,
    tmdbId: media.tmdbId,
  }));

  log.debug({ context, media: formattedMedia, service }, 'Media');
  log.info({ context, service }, 'Finished');

  return formattedMedia;
};
