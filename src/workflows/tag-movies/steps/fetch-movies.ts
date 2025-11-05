import { getMovies } from '@/services/radarr';

import type { Movie } from './types';

export const fetchMovies = async (): Promise<Movie[]> => {
  'use step';

  const movies = await getMovies();
  return movies.map(movie => ({
    id: movie.id,
    tags: movie.tags,
    title: movie.title,
    tmdbId: movie.tmdbId,
  }));
};
