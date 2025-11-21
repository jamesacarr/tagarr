import { getMovies } from '@/services/radarr';
import type { Item, WithTags } from '@/workflows/types';

export const fetchMovies = async (
  url: string,
  apiKey: string,
): Promise<WithTags<Item>[]> => {
  'use step';

  const movies = await getMovies(url, apiKey);
  return movies.map(movie => ({
    id: movie.id,
    tags: movie.tags,
    title: movie.title,
    tmdbId: movie.tmdbId,
  }));
};
