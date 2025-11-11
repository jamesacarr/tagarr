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
  configContract: 'RadarrListSettings';
  enableAuto: boolean;
  enabled: true;
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
  minimumAvailability: string;
  monitor: string;
  name: string;
  presets: string[];
  qualityProfileId: number;
  rootFolderPath: string;
  searchOnAdd: boolean;
  tags: number[];
}

export interface MovieResponse {
  added: string;
  alternateTitles: Array<{
    id: number;
    movieMetadataId: number;
    sourceType: string;
    title: string;
  }>;
  certification: string;
  cleanTitle: string;
  collection: {
    title: string;
    tmdbId: number;
  };
  digitalRelease: string;
  folderName: string;
  genres: string[];
  hasFile: boolean;
  id: number;
  images: Array<{
    coverType: string;
    remoteUrl: string;
    url: string;
  }>;
  imdbId: string;
  inCinemas: string;
  isAvailable: boolean;
  keywords: string[];
  lastSearchTime: string;
  minimumAvailability: string;
  monitored: boolean;
  movieFile: {
    dateAdded: string;
    edition: string;
    id: number;
    indexerFlags: number;
    languages: Array<{
      id: number;
      name: string;
    }>;
    mediaInfo: {
      audioBitrate: number;
      audioChannels: number;
      audioCodec: string;
      audioLanguages: string;
      audioStreamCount: number;
      resolution: string;
      runTime: string;
      scanType: string;
      subtitles: string;
      videoBitDepth: number;
      videoBitrate: number;
      videoCodec: string;
      videoDynamicRange: string;
      videoDynamicRangeType: string;
      videoFps: number;
    };
    movieId: number;
    originalFilePath: string;
    path: string;
    quality: {
      quality: {
        id: number;
        modifier: string;
        name: string;
        resolution: number;
        source: string;
      };
      revision: {
        isRepack: boolean;
        real: number;
        version: number;
      };
    };
    qualityCutoffNotMet: boolean;
    relativePath: string;
    releaseGroup: string;
    sceneName: string;
    size: number;
  };
  movieFileId: number;
  originalLanguage: {
    id: number;
    name: string;
  };
  originalTitle: string;
  overview: string;
  path: string;
  physicalRelease: string;
  popularity: number;
  qualityProfileId: number;
  ratings: {
    imdb: {
      type: string;
      value: number;
      votes: number;
    };
    metacritic: {
      type: string;
      value: number;
      votes: number;
    };
    rottenTomatoes: {
      type: string;
      value: number;
      votes: number;
    };
    tmdb: {
      type: string;
      value: number;
      votes: number;
    };
    trakt: {
      type: string;
      value: number;
      votes: number;
    };
  };
  releaseDate: string;
  rootFolderPath: string;
  runtime: number;
  secondaryYearSourceId: number;
  sizeOnDisk: number;
  sortTitle: string;
  statistics: {
    movieFileCount: number;
    releaseGroups: string[];
    sizeOnDisk: number;
  };
  status: string;
  studio: string;
  tags: number[];
  title: string;
  titleSlug: string;
  tmdbId: number;
  website: string;
  year: number;
  youTubeTrailerId: string;
}
