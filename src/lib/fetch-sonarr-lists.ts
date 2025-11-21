import { getLists, getTags, validateConfig } from '@/services/sonarr';

import { formatList } from './format-list';

export const fetchSonarrLists = async () => {
  const { success, url, apiKey } = await validateConfig();
  if (!success) {
    return [];
  }

  const [lists, tags] = await Promise.all([
    getLists(url, apiKey),
    getTags(url, apiKey),
  ]);

  const formatLists = formatList('sonarr', tags);
  const formattedLists = lists
    .map(list => formatLists(list))
    .sort((a, b) => a.name.localeCompare(b.name));

  return formattedLists;
};
