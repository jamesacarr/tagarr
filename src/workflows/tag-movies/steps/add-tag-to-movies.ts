import { addTag } from '@/services/radarr';
import type { Item } from '@/workflows/types';

export const addTagToMovies = async (
  url: string,
  apiKey: string,
  tagId: number,
  movies: Item[],
): Promise<void> => {
  'use step';

  if (movies.length === 0) {
    return;
  }

  await addTag(
    url,
    apiKey,
    tagId,
    movies.map(movie => movie.id),
  );
};
