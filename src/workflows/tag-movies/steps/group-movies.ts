import type {
  Grouped,
  Item,
  ListWithItems,
  Tag,
  WithTags,
} from '@/workflows/types';

// biome-ignore lint/suspicious/useAwait: needs to be async for workflows
export const groupMovies = async (
  movies: WithTags<Item>[],
  lists: ListWithItems[],
  tags: Tag[],
): Promise<Grouped<Item>[]> => {
  'use step';

  const tagIds = lists.flatMap(list => list.tags);
  const tagsMap = new Map(tagIds.map(tagId => [tagId, new Set<number>()]));

  for (const list of lists) {
    for (const itemId of list.itemIds) {
      for (const tagId of list.tags) {
        tagsMap.get(tagId)?.add(itemId);
      }
    }
  }

  const groupedMovies = [...tagsMap.entries()].map(([tagId, itemIds]) => {
    const tag = tags.find(tag => tag.id === tagId);
    if (!tag) {
      throw new Error(`Tag with id ${tagId} not found`);
    }

    const moviesToAdd = movies
      .filter(movie => itemIds.has(movie.tmdbId) && !movie.tags.includes(tagId))
      .map(movie => ({
        id: movie.id,
        title: movie.title,
        tmdbId: movie.tmdbId,
      }));
    const moviesToRemove = movies
      .filter(movie => !itemIds.has(movie.tmdbId) && movie.tags.includes(tagId))
      .map(movie => ({
        id: movie.id,
        title: movie.title,
        tmdbId: movie.tmdbId,
      }));

    return {
      added: {
        count: moviesToAdd.length,
        items: moviesToAdd,
      },
      removed: {
        count: moviesToRemove.length,
        items: moviesToRemove,
      },
      tag,
    };
  });

  return groupedMovies;
};
