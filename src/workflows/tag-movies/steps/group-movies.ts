import type { ListWithItems, Movie } from './types';

// biome-ignore lint/suspicious/useAwait: needs to be async for workflows
export const groupMovies = async (movies: Movie[], list: ListWithItems) => {
  'use step';

  const itemIds = new Set(list.itemIds);
  const moviesToAdd = movies.filter(
    movie => itemIds.has(movie.tmdbId) && !movie.tags.includes(list.tag_id),
  );
  const moviesToRemove = movies.filter(
    movie => !itemIds.has(movie.tmdbId) && movie.tags.includes(list.tag_id),
  );

  return {
    moviesToAdd,
    moviesToRemove,
  };
};
