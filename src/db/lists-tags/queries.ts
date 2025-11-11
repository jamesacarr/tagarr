'use server';

import { db } from '../db';
import type { NewListsTags } from './types';

export const getAllListsTags = async () => {
  const listsTags = await db.selectFrom('lists_tags').selectAll().execute();

  return listsTags;
};

export const insertListsTags = async (newListsTags: NewListsTags[]) => {
  const lists = await db
    .insertInto('lists_tags')
    .orIgnore()
    .values(newListsTags)
    .returningAll()
    .execute();

  return lists;
};

export const deleteListsTags = async (
  listId: number,
  currentTagIds: number[],
) => {
  await db
    .deleteFrom('lists_tags')
    .where('list_id', '=', listId)
    .where('tag_id', 'not in', currentTagIds)
    .execute();
};
