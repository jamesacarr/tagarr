import { insertTags } from '@/db/tag/queries';
import type { NewTag } from '@/db/tag/types';

export const insertNewTags = async (tags: NewTag[]) => {
  'use step';

  if (tags.length === 0) {
    return {
      count: 0,
      tags: [],
    };
  }

  const newTags = await insertTags(tags);

  return {
    count: newTags.length,
    tags: newTags,
  };
};
