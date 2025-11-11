import type { Tag } from '@/db/tag/types';

export interface ListWithItems {
  id: number;
  tags: Tag[];
  itemIds: number[];
}

export interface Movie {
  id: number;
  tags: number[];
  title: string;
  tmdbId: number;
}
