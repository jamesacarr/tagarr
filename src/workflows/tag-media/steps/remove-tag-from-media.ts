import { getStepMetadata } from 'workflow';

import { createLogger } from '@/lib/logger';
import { createArrService } from '@/services/arr-service';
import type { Item } from '@/workflows/types';

const log = createLogger('[Workflow/TagMedia/RemoveTagFromMedia]');

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

  const context = getStepMetadata();
  log.info({ context, service, tagId }, 'Starting');

  const mediaIds = media.map(media => media.id);
  log.debug({ context, mediaIds, service, tagId }, 'Media IDs');

  const arrService = createArrService(service, url, apiKey);
  await arrService.removeTag(tagId, mediaIds);

  log.info({ context, service, tagId }, 'Finished');
};
