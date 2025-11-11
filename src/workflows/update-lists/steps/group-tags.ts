import { isEqual } from 'radash';

import { getAllTags } from '@/db/tag/queries';
import type { NewTag, Tag } from '@/db/tag/types';

const areTagsEqual = (existingTag: Tag | undefined, newTag: NewTag) =>
  existingTag && isEqual(existingTag, newTag);

export const groupTags = async (tags: NewTag[]) => {
  'use step';

  const existingTags = new Map((await getAllTags()).map(tag => [tag.id, tag]));

  const tagsToInsert = tags.filter(tag => !existingTags.has(tag.id));
  const tagsToUpdate = tags.filter(
    tag =>
      existingTags.has(tag.id) && !areTagsEqual(existingTags.get(tag.id), tag),
  );
  const tagsToDelete = [...existingTags.values()].filter(
    tag => !tags.some(t => t.id === tag.id),
  );

  return {
    tagsToDelete,
    tagsToInsert,
    tagsToUpdate,
  };
};
