import type {
  Grouped,
  Item,
  ListWithItems,
  Tag,
  WithTags,
} from '@/workflows/types';

// biome-ignore lint/suspicious/useAwait: needs to be async for workflows
export const groupMedia = async (
  media: WithTags<Item>[],
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

  const groupedMedia = [...tagsMap.entries()].map(([tagId, itemIds]) => {
    const tag = tags.find(tag => tag.id === tagId);
    if (!tag) {
      throw new Error(`Tag with id ${tagId} not found`);
    }

    const mediaToAdd = media
      .filter(media => itemIds.has(media.tmdbId) && !media.tags.includes(tagId))
      .map(media => ({
        id: media.id,
        title: media.title,
        tmdbId: media.tmdbId,
      }));
    const mediaToRemove = media
      .filter(media => !itemIds.has(media.tmdbId) && media.tags.includes(tagId))
      .map(media => ({
        id: media.id,
        title: media.title,
        tmdbId: media.tmdbId,
      }));

    return {
      added: {
        count: mediaToAdd.length,
        items: mediaToAdd,
      },
      removed: {
        count: mediaToRemove.length,
        items: mediaToRemove,
      },
      tag,
    };
  });

  return groupedMedia;
};
