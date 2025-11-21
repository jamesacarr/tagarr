export interface Tag {
  id: number;
  label: string;
}

export interface List {
  id: number;
  name: string;
  service: 'radarr' | 'sonarr';
  tags: Tag[];
  url: string;
}
