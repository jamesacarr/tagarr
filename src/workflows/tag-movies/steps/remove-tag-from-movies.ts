import { removeTag } from '@/services/radarr/remove-tag';
import type { Item } from '@/workflows/types';

export const removeTagFromMovies = async (
  url: string,
  apiKey: string,
  tagId: number,
  movies: Item[],
): Promise<void> => {
  'use step';

  if (movies.length === 0) {
    return;
  }

  await removeTag(
    url,
    apiKey,
    tagId,
    movies.map(movie => movie.id),
  );
};
