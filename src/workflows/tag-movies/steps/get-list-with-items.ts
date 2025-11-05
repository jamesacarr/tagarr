import { FatalError } from 'workflow';

import { getListById } from '@/db/list/queries';
import { getListItems } from '@/services/mdblist';

import type { ListWithItems } from './types';

export const getListWithItems = async (
  listId: number,
): Promise<ListWithItems> => {
  'use step';

  const list = await getListById(listId);
  if (!list) {
    throw new FatalError('List not found');
  }

  if (list.sync !== 1) {
    throw new FatalError('List is not synced');
  }

  if (!list.tag_id) {
    throw new FatalError('List has no tag');
  }

  const items = await getListItems(list.id);
  const itemIds = items.movies.map(movie => movie.id);

  return {
    id: list.id,
    itemIds,
    tag_id: list.tag_id,
  };
};
