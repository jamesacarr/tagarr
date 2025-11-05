import { updateList } from '@/db/list/queries';

export const updateListSynced = async (listId: number, timestamp: string) => {
  'use step';

  await updateList(listId, { last_synced_at: timestamp });
};
