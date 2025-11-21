import type {
  Grouped,
  Item,
  ListWithItems,
  Tag,
  WithTags,
} from '@/workflows/types';

// biome-ignore lint/suspicious/useAwait: needs to be async for workflows
export const groupSeries = async (
  series: WithTags<Item>[],
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

  const groupedSeries = [...tagsMap.entries()].map(([tagId, itemIds]) => {
    const tag = tags.find(tag => tag.id === tagId);
    if (!tag) {
      throw new Error(`Tag with id ${tagId} not found`);
    }

    const seriesToAdd = series
      .filter(
        series => itemIds.has(series.tmdbId) && !series.tags.includes(tagId),
      )
      .map(series => ({
        id: series.id,
        title: series.title,
        tmdbId: series.tmdbId,
      }));
    const seriesToRemove = series
      .filter(
        series => !itemIds.has(series.tmdbId) && series.tags.includes(tagId),
      )
      .map(series => ({
        id: series.id,
        title: series.title,
        tmdbId: series.tmdbId,
      }));

    return {
      added: {
        count: seriesToAdd.length,
        items: seriesToAdd,
      },
      removed: {
        count: seriesToRemove.length,
        items: seriesToRemove,
      },
      tag,
    };
  });

  return groupedSeries;
};
