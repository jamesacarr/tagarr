import { addTag } from '@/services/radarr/add-tag';

import type { Movie } from './types';

export const addTagToMovies = async (tagId: number, movies: Movie[]) => {
  'use step';

  if (movies.length === 0) {
    return;
  }

  await addTag(
    tagId,
    movies.map(movie => movie.id),
  );
};
