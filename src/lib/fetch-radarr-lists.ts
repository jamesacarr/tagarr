import { getLists, getTags, validateConfig } from '@/services/radarr';

import { formatList } from './format-list';

export const fetchRadarrLists = async () => {
  const { success, url, apiKey } = await validateConfig();
  if (!success) {
    return [];
  }

  const [lists, tags] = await Promise.all([
    getLists(url, apiKey),
    getTags(url, apiKey),
  ]);

  const formatLists = formatList('radarr', tags);
  const formattedLists = lists
    .map(list => formatLists(list))
    .sort((a, b) => a.name.localeCompare(b.name));

  return formattedLists;
};
