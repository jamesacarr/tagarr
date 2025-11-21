import { createArrService } from '@/services/arr-service';
import type { Tag } from '@/workflows/types';

export const fetchTags = async (
  service: 'radarr' | 'sonarr',
  url: string,
  apiKey: string,
): Promise<Tag[]> => {
  'use step';

  const arrService = createArrService(service, url, apiKey);
  return await arrService.getTags();
};
