import type { Grouped, Item } from '@/workflows/types';

import { addTagToMovies } from './steps/add-tag-to-movies';
import { fetchLists } from './steps/fetch-lists';
import { fetchMovies } from './steps/fetch-movies';
import { fetchTags } from './steps/fetch-tags';
import { groupMovies } from './steps/group-movies';
import { removeTagFromMovies } from './steps/remove-tag-from-movies';
import { validateRadarrConfig } from './steps/validate-radarr-config';

export const tagMovies = async (): Promise<Grouped<Item>[]> => {
  'use workflow';

  const { apiKey, url } = await validateRadarrConfig();

  const [lists, movies, tags] = await Promise.all([
    fetchLists(url, apiKey),
    fetchMovies(url, apiKey),
    fetchTags(url, apiKey),
  ]);
  const groupedMovies = await groupMovies(movies, lists, tags);

  for (const { added, removed, tag } of groupedMovies) {
    await addTagToMovies(url, apiKey, tag.id, added.items);
    await removeTagFromMovies(url, apiKey, tag.id, removed.items);
  }

  return groupedMovies;
};
