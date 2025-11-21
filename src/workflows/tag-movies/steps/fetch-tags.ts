import { getTags } from '@/services/radarr';
import type { Tag } from '@/workflows/types';

export const fetchTags = async (
  url: string,
  apiKey: string,
): Promise<Tag[]> => {
  'use step';

  return await getTags(url, apiKey);
};
