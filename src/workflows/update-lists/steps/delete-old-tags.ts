import { deleteTags } from '@/db/tag/queries';
import type { Tag } from '@/db/tag/types';

export const deleteOldTags = async (tags: Tag[]) => {
  'use step';

  if (tags.length === 0) {
    return {
      count: 0,
      tags: [],
    };
  }

  const deletedTags = await deleteTags(tags.map(tag => tag.id));

  return {
    count: deletedTags.length,
    tags: deletedTags,
  };
};
