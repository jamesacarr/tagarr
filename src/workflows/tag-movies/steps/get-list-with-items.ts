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

  if (list.enabled !== 1) {
    throw new FatalError('List is not synced');
  }

  if (list.tags.length === 0) {
    throw new FatalError('List has no tags');
  }

  if (!list.url.startsWith('https://mdblist.com')) {
    throw new FatalError('List is not a MDBList list');
  }

  const items = await getListItems(list.url);
  const itemIds = items.map(item => item.id);

  return {
    id: list.id,
    itemIds,
    tags: list.tags,
  };
};
