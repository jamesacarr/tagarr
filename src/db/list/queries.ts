'use server';

import type { ExpressionBuilder } from 'kysely';
import { jsonArrayFrom } from 'kysely/helpers/sqlite';

import { db } from '../db';
import type { Database } from '../types';
import type { ListUpdate, NewList, SyncedList } from './types';

const withTags = (eb: ExpressionBuilder<Database, 'list'>) =>
  jsonArrayFrom(
    eb
      .selectFrom('tag')
      .innerJoin('lists_tags', 'tag.id', 'lists_tags.tag_id')
      .select(['tag.id', 'tag.label'])
      .whereRef('lists_tags.list_id', '=', 'list.id'),
  ).as('tags');

export const deleteAllLists = async () => {
  await db.deleteFrom('list').execute();
};

export const getAllLists = async () => {
  const lists = await db
    .selectFrom('list')
    .selectAll('list')
    .select(eb => [withTags(eb)])
    .execute();

  return lists;
};

export const getAllSyncedLists = async (): Promise<SyncedList[]> => {
  const lists = await db
    .selectFrom('list')
    .selectAll('list')
    .select(eb => [withTags(eb)])
    .where('enabled', '=', 1)
    .execute();

  // Manually enforcing type here because the query builder doesn't
  // handle it properly.
  return lists as SyncedList[];
};

export const getListById = async (id: number) => {
  const list = await db
    .selectFrom('list')
    .selectAll('list')
    .select(eb => [withTags(eb)])
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
