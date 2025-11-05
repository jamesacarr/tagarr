import type { Insertable, Selectable, Updateable } from 'kysely';

export interface TagTable {
  id: number;
  label: string;
}

export type Tag = Selectable<TagTable>;
export type NewTag = Insertable<TagTable>;
export type TagUpdate = Updateable<TagTable>;
