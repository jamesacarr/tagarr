import { removeTag } from '@/services/radarr/remove-tag';

import type { Movie } from './types';

export const removeTagFromMovies = async (tagId: number, movies: Movie[]) => {
  'use step';

  if (movies.length === 0) {
    return;
  }

  await removeTag(
    tagId,
    movies.map(movie => movie.id),
  );
};
