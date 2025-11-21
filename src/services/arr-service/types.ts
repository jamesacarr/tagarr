/**
 * A simplified list representation with basic information
 */
export interface List {
  /** Unique identifier for the list */
  id: number;
  /** Name of the list */
  name: string;
  /** Array of tag IDs associated with this list */
  tags: number[];
  /** URL where the list can be accessed */
  url: string;
}

/**
 * A list with full tag information (IDs and labels)
 */
export interface ListWithTags {
  /** Unique identifier for the list */
  id: number;
  /** Name of the list */
  name: string;
  /** Array of tag objects with full details */
  tags: Tag[];
  /** URL where the list can be accessed */
  url: string;
}

/**
 * Configuration field for an import list
 */
interface ListField {
  /** Whether this is an advanced field */
  advanced: boolean;
  /** Help text for the field */
  helpText: string;
  /** Whether the field accepts float values */
  isFloat: boolean;
  /** Display label for the field */
  label: string;
  /** Internal name of the field */
  name: string;
  /** Display order */
  order: number;
  /** Privacy setting for the field */
  privacy: string;
  /** Field type */
  type: string;
  /** Current value of the field */
  value: string;
}

/**
 * Represents a movie in Radarr with all its metadata and file information
 */
export interface Movie {
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

/**
 * Represents an import list configuration in Radarr
 */
export interface MovieList {
  /** Configuration contract identifier */
  configContract: string;
  /** Whether auto-add is enabled */
  enableAuto: boolean;
  /** Whether the list is enabled */
  enabled: boolean;
  /** Configuration fields for the list */
  fields: ListField[];
  /** Unique identifier for the list */
  id: number;
  /** Implementation identifier */
  implementation: string;
  /** Human-readable implementation name */
  implementationName: string;
  /** URL to more information */
  infoLink: string;
  /** Order in which lists are processed */
  listOrder: number;
  /** Type of list */
  listType: string;
  /** Optional informational message */
  message?: {
    message: string;
    type: 'info';
  };
  /** Minimum interval between list refreshes */
  minRefreshInterval: string;
  /** Minimum availability setting */
  minimumAvailability: string;
  /** Monitor setting */
  monitor: string;
  /** Name of the list */
  name: string;
  /** Available presets */
  presets: string[];
  /** Quality profile ID to apply */
  qualityProfileId: number;
  /** Root folder path for movies */
  rootFolderPath: string;
  /** Whether to search for movies on add */
  searchOnAdd: boolean;
  /** Tag IDs associated with this list */
  tags: number[];
}

/**
 * Type of series monitoring
 */
type SeriesType = 'standard' | 'daily' | 'anime';

/**
 * Represents a TV series in Sonarr with all its metadata and season information
 */
export interface Series {
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

/**
 * Represents an import list configuration in Sonarr
 */
export interface SeriesList {
  /** Configuration contract identifier */
  configContract: string;
  /** Whether automatic addition is enabled */
  enableAutomaticAdd: boolean;
  /** Configuration fields for the list */
  fields: ListField[];
  /** Unique identifier for the list */
  id: number;
  /** Implementation identifier */
  implementation: string;
  /** Human-readable implementation name */
  implementationName: string;
  /** URL to more information */
  infoLink: string;
  /** Order in which lists are processed */
  listOrder: number;
  /** Type of list */
  listType: string;
  /** Optional informational message */
  message?: {
    message: string;
    type: 'info';
  };
  /** Minimum interval between list refreshes */
  minRefreshInterval: string;
  /** How to monitor new items */
  monitorNewItems: string;
  /** Name of the list */
  name: string;
  /** Quality profile ID to apply */
  qualityProfileId: number;
  /** Root folder path for series */
  rootFolderPath: string;
  /** Whether to search for missing episodes */
  searchForMissingEpisodes: boolean;
  /** Whether to use season folders */
  seasonFolder: boolean;
  /** Type of series (standard, daily, anime) */
  seriesType: SeriesType;
  /** What to monitor */
  shouldMonitor: string;
  /** Tag IDs associated with this list */
  tags: number[];
}

/**
 * A tag that can be applied to media items
 */
export interface Tag {
  /** Unique identifier for the tag */
  id: number;
  /** Human-readable label for the tag */
  label: string;
}

/**
 * Result when ping fails during configuration validation
 */
interface PingFailedResult {
  /** Indicates validation failure */
  success: false;
  /** URL is null when ping fails */
  url: null;
  /** API key is null when ping fails */
  apiKey: null;
  /** Specific error type */
  error: 'ping-failed';
}

/**
 * Result when status check fails during configuration validation
 */
interface StatusFailedResult {
  /** Indicates validation failure */
  success: false;
  /** URL is preserved when status fails (ping succeeded) */
  url: string;
  /** API key is null when status check fails (invalid key) */
  apiKey: null;
  /** Specific error type */
  error: 'status-failed';
}

/**
 * Result when configuration validation succeeds
 */
interface ValidResult {
  /** Indicates validation success */
  success: true;
  /** Validated URL */
  url: string;
  /** Validated API key */
  apiKey: string;
}

/**
 * Discriminated union type for configuration validation results
 *
 * Use the `success` field to narrow the type and access error details.
 *
 * @example
 * ```typescript
 * const result = await service.validateConfig();
 * if (result.success) {
 *   console.log(`Connected to ${result.url}`);
 * } else if (result.error === 'ping-failed') {
 *   console.error('Could not reach server');
 * } else if (result.error === 'status-failed') {
 *   console.error('Invalid API key');
 * }
 * ```
 */
export type ValidateConfigResult =
  | PingFailedResult
  | StatusFailedResult
  | ValidResult;
