import { logger } from '@/lib/logger';
import { createArrService } from '@/services/arr-service';
import type { Tag } from '@/workflows/types';

export const fetchTags = async (
  service: 'radarr' | 'sonarr',
  url: string,
  apiKey: string,
): Promise<Tag[]> => {
  'use step';

  logger.info({ service }, 'Fetching tags');

  const arrService = createArrService(service, url, apiKey);
  const tags = await arrService.getTags();
  logger.debug({ tags }, 'Tags');

  return tags;
};
