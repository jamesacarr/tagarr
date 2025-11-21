type SeriesType = 'standard' | 'daily' | 'anime';

interface ListField {
  advanced: boolean;
  helpText: string;
  isFloat: boolean;
  label: string;
  name: string;
  order: number;
  privacy: string;
  type: string;
  value: string;
}

export interface ListResponse {
  configContract: string;
  enableAutomaticAdd: boolean;
  fields: ListField[];
  id: number;
  implementation: string;
  implementationName: string;
  infoLink: string;
  listOrder: number;
  listType: string;
  message?: {
    message: string;
    type: 'info';
  };
  minRefreshInterval: string;
  monitorNewItems: string;
  name: string;
  qualityProfileId: number;
  rootFolderPath: string;
  searchForMissingEpisodes: boolean;
  seasonFolder: boolean;
  seriesType: SeriesType;
  shouldMonitor: string;
  tags: number[];
}

export interface SeriesResponse {
  added: string;
  airTime: string;
  certification: string;
  cleanTitle: string;
  ended: boolean;
  firstAired: string;
  genres: string[];
  id: number;
  images: Array<{
    coverType: string;
    remoteUrl: string;
  }>;
  imdbId: string;
  languageProfileId: number;
  lastAired: string;
  monitorNewItems: string;
  monitored: boolean;
  network: string;
  originalLanguage: {
    id: number;
    name: string;
  };
  overview: string;
  path: string;
  qualityProfileId: number;
  ratings: {
    value: number;
    votes: number;
  };
  runtime: number;
  seasonFolder: boolean;
  seasons: Array<{
    monitored: boolean;
    seasonNumber: number;
  }>;
  seriesType: SeriesType;
  sortTitle: string;
  status: 'continuing' | 'ended' | 'upcoming' | 'deleted';
  tags: number[];
  title: string;
  titleSlug: string;
  tmdbId: number;
  tvMazeId: number;
  tvRageId: number;
  tvdbId: number;
  useSceneNumbering: boolean;
  year: number;
}

export interface TagResponse {
  id: number;
  label: string;
}
