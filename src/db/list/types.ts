import type { Insertable, Selectable, Updateable } from 'kysely';

import type { Tag } from '@/db/tag/types';

export interface ListTable {
  id: number;
  name: string;
  url: string;
  enabled: number;
  last_synced_at: string | null;
}

type WithTags<T> = T & {
  tags: Tag[];
};

export type List = Selectable<ListTable>;
export type NewList = Insertable<ListTable>;
export type ListUpdate = Updateable<ListTable>;
export type SyncedList = WithTags<List> & {
  enabled: 1;
};
export type ListWithTags = WithTags<List>;
export type NewListWithTags = NewList & {
  tag_ids: number[];
};
