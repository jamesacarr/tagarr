import type { ConfigTable } from './config/types';
import type { ListTable } from './list/types';
import type { TagTable } from './tag/types';

export interface Database {
  config: ConfigTable;
  list: ListTable;
  tag: TagTable;
}
