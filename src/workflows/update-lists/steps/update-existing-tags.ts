import { updateTag } from '@/db/tag/queries';
import type { NewTag } from '@/db/tag/types';

export const updateExistingTags = async (tags: NewTag[]) => {
  'use step';

  if (tags.length === 0) {
    return {
      count: 0,
      tags: [],
    };
  }

  const updatedTags = await Promise.all(
    tags.map(tag => updateTag(tag.id, tag)),
  );

  return {
    count: updatedTags.length,
    tags: updatedTags,
  };
};
