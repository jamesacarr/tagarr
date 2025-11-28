export interface ListWithItems {
  id: number; // This is the tmdb id number
  tags: Tag[];
  itemIds: number[];
}

export type Grouped<T> = {
  added: {
    count: number;
    items: T[];
  };
  removed: {
    count: number;
    items: T[];
  };
  tag: Tag;
};

export interface Item {
  id: number;
  title: string;
  tmdbId: number;
}

export type WithTags<T> = T & {
  tags: number[];
};

export interface Tag {
  id: number;
  label: string;
}
