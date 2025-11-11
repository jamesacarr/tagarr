import type { ListWithItems, Movie } from './types';

// biome-ignore lint/suspicious/useAwait: needs to be async for workflows
export const groupMovies = async (movies: Movie[], lists: ListWithItems[]) => {
  'use step';

  const tagIds = lists.flatMap(list => list.tags.map(tag => tag.id));
  const tagsMap = new Map(tagIds.map(tagId => [tagId, new Set<number>()]));

  for (const list of lists) {
    for (const itemId of list.itemIds) {
      for (const tag of list.tags) {
        tagsMap.get(tag.id)?.add(itemId);
      }
    }
  }

  const groupedMovies = [...tagsMap.entries()].map(([tagId, itemIds]) => {
    const moviesToAdd = movies.filter(
      movie => itemIds.has(movie.tmdbId) && !movie.tags.includes(tagId),
    );
    const moviesToRemove = movies.filter(
      movie => !itemIds.has(movie.tmdbId) && movie.tags.includes(tagId),
    );

    return {
      moviesToAdd,
      moviesToRemove,
      tagId,
    };
  });

  return groupedMovies;
};
