import { getStepMetadata } from 'workflow';

import { createLogger } from '@/lib/logger';
import type {
  Grouped,
  Item,
  ListWithItems,
  Tag,
  WithTags,
} from '@/workflows/types';

const log = createLogger('[Workflow/TagMedia/GroupMedia]');

// biome-ignore lint/suspicious/useAwait: needs to be async for workflows
export const groupMedia = async (
  media: WithTags<Item>[],
  lists: ListWithItems[],
): Promise<Grouped<Item>[]> => {
  'use step';

  const context = getStepMetadata();

  log.info({ context }, 'Starting');

  const tagsMap: Map<number, Tag & { itemIds: Set<number> }> = new Map();
  for (const list of lists) {
    for (const tag of list.tags) {
      const tagWithItems = tagsMap.get(tag.id) ?? {
        ...tag,
        itemIds: new Set<number>(),
      };

      for (const itemId of list.itemIds) {
        tagWithItems.itemIds.add(itemId);
      }

      tagsMap.set(tag.id, tagWithItems);
    }
  }

  log.debug({ context, tagsMap }, 'Tags map');

  const groupedMedia = [...tagsMap.entries()].map(([tagId, tagWithItems]) => {
    const mediaToAdd = media
      .filter(
        media =>
          tagWithItems.itemIds.has(media.tmdbId) && !media.tags.includes(tagId),
      )
      .map(media => ({
        id: media.id,
        title: media.title,
        tmdbId: media.tmdbId,
      }));
    const mediaToRemove = media
      .filter(
        media =>
          !tagWithItems.itemIds.has(media.tmdbId) && media.tags.includes(tagId),
      )
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
      tag: {
        id: tagWithItems.id,
        label: tagWithItems.label,
      },
    };
  });

  log.debug({ context, groupedMedia }, 'Grouped media');
  log.info({ context }, 'Finished');

  return groupedMedia;
};
