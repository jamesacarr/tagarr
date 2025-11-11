import { getTags } from '@/services/radarr';

export const fetchTags = async () => {
  'use step';

  const tags = await getTags();
  return tags;
};
