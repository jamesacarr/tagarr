import type { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface ListTable {
  id: number;
  name: string;
  description: string;
  slug: string;
  url: string;
  tag_id: number | null;
  sync: ColumnType<number, number | undefined>;
  last_synced_at: string | null;
}

export type List = Selectable<ListTable>;
export type NewList = Insertable<ListTable>;
export type ListUpdate = Updateable<ListTable>;
export type SyncedList = List & {
  sync: 1;
  tag_id: number;
};
export type ListWithTag = List & {
  tag_label: string | null;
};
