import type { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface ConfigTable {
  id: Generated<number>;
  radarr_api_key: string;
  radarr_url: string;
  sonarr_api_key: string;
  sonarr_url: string;
  mdblist_api_key: string;
}

export type Config = Selectable<ConfigTable>;
export type NewConfig = Insertable<ConfigTable>;
export type ConfigUpdate = Updateable<ConfigTable>;
