import type { Insertable, Selectable, Updateable } from 'kysely';

export interface ListsTagsTable {
  list_id: number;
  tag_id: number;
}

export type ListsTags = Selectable<ListsTagsTable>;
export type NewListsTags = Insertable<ListsTagsTable>;
export type ListsTagsUpdate = Updateable<ListsTagsTable>;
