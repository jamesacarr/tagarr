'use server';

import { db } from '../db';
import type { ListUpdate, NewList, SyncedList } from './types';

export const deleteAllLists = async () => {
  await db.deleteFrom('list').execute();
};

export const getAllLists = async () => {
  const lists = await db.selectFrom('list').selectAll('list').execute();

  return lists;
};

export const getAllListsWithTags = async () => {
  const lists = await db
    .selectFrom('list')
    .leftJoin('tag', 'list.tag_id', 'tag.id')
    .selectAll('list')
    .select('tag.label as tag_label')
    .execute();

  return lists;
};

export const getAllSyncedLists = async (): Promise<SyncedList[]> => {
  const lists = await db
    .selectFrom('list')
    .selectAll()
    .where('sync', '=', 1)
    .where('tag_id', 'is not', null)
    .execute();

  // Manually enforcing type here because the query builder doesn't
  // handle it properly.
  return lists as SyncedList[];
};

export const getListById = async (id: number) => {
  const list = await db
    .selectFrom('list')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirst();

  return list;
};

export const insertLists = async (newLists: NewList[]) => {
  const lists = await db
    .insertInto('list')
    .orIgnore()
    .values(newLists)
    .returningAll()
    .execute();

  return lists;
};

export const updateList = async (id: number, data: ListUpdate) => {
  const list = await db
    .updateTable('list')
    .set(data)
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();

  return list;
};

export const deleteLists = async (ids: number[]) => {
  const lists = await db
    .deleteFrom('list')
    .where('id', 'in', ids)
    .returningAll()
    .execute();

  return lists;
};
