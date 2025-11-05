export interface ListWithItems {
  id: number;
  tag_id: number;
  itemIds: number[];
}

export interface Movie {
  id: number;
  tags: number[];
  title: string;
  tmdbId: number;
}
