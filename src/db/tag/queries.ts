'use server';

import { db } from '../db';
import type { NewTag, TagUpdate } from './types';

export const getAllTags = async () => {
  const tags = await db.selectFrom('tag').selectAll().execute();

  return tags;
};

export const insertTags = async (newTags: NewTag[]) => {
  const tags = await db
    .insertInto('tag')
    .orIgnore()
    .values(newTags)
    .returningAll()
    .execute();

  return tags;
};

export const updateTag = async (id: number, data: TagUpdate) => {
  const tag = await db
    .updateTable('tag')
    .set(data)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();

  return tag;
};

export const deleteTags = async (ids: number[]) => {
  const tags = await db
    .deleteFrom('tag')
    .where('id', 'in', ids)
    .returningAll()
    .execute();

  return tags;
};
