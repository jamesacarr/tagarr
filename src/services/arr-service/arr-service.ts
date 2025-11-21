import ky from 'ky';

import type { List, ListWithTags, Tag, ValidateConfigResult } from './types';

/**
 * Configuration for an *arr service instance
 */
interface ArrServiceConfig {
  /** API key for authentication */
  apiKey: string;
  /** Base URL of the *arr service */
  url: string;
}

/**
 * Base interface for *arr list types
 */
interface BaseList {
  /** Unique identifier for the list */
  id: number;
  /** Name of the list */
  name: string;
  /** Tag IDs associated with the list */
  tags: number[];
}

/**
 * Generic abstract service class for interacting with *arr applications (Radarr, Sonarr, etc.)
 *
 * This base class provides common functionality for all *arr services including
 * fetching media, managing tags, and validating configuration. Subclasses must implement
 * service-specific methods like determining list URLs, enabled status, media type, and
 * the key for updating media tags.
 *
 * @template TMedia - The media type (Movie, Series, etc.)
 * @template TList - The list type (MovieList, SeriesList, etc.)
 *
 * @example
 * ```typescript
 * class RadarrService extends ArrService<Movie, MovieList> {
 *   protected getMediaType() { return 'movie'; }
 *   protected getMediaIdsKey() { return 'movieIds'; }
 *   protected getListEnabled(list: MovieList) { return list.enabled; }
 *   protected getListUrl(list: MovieList) { return list.fields.find(f => f.name === 'url')?.value ?? ''; }
 * }
 * ```
 */
export abstract class ArrService<TMedia, TList extends BaseList> {
  protected readonly config: ArrServiceConfig;

  /**
   * Creates a new *arr service instance
   *
   * @param config - Service configuration including URL and API key
   * @throws {Error} When URL or API key is missing
   */
  constructor(config: ArrServiceConfig) {
    if (!config.url || !config.apiKey) {
      throw new Error('URL and API key are required');
    }

    this.config = config;
  }

  /**
   * Determines if a list is enabled in the *arr service
   *
   * @param list - The list to check
   * @returns True if the list is enabled
   */
  protected abstract getListEnabled(list: TList): boolean;

  /**
   * Extracts the URL from a list's configuration
   *
   * @param list - The list to extract the URL from
   * @returns The list URL or empty string if not found
   */
  protected abstract getListUrl(list: TList): string;

  /**
   * Gets the media type for API endpoints (e.g., 'movie', 'series')
   *
   * @returns The media type string
   */
  protected abstract getMediaType(): string;

  /**
   * Gets the key used for media IDs in API requests (e.g., 'movieIds', 'seriesIds')
   *
   * @returns The media IDs key string
   */
  protected abstract getMediaIdsKey(): string;

  /**
   * Adds a tag to multiple media items
   *
   * @param tagId - The ID of the tag to add
   * @param mediaIds - Array of media IDs to tag
   * @returns Promise resolving to updated media items
   *
   * @example
   * ```typescript
   * const updatedMovies = await radarrService.addTag(5, [1, 2, 3]);
   * ```
   */
  async addTag(tagId: number, mediaIds: number[]): Promise<TMedia[]> {
    const { url, apiKey } = this.config;
    const mediaType = this.getMediaType();
    const mediaIdsKey = this.getMediaIdsKey();

    return await ky
      .put<TMedia[]>(`${url}/api/v3/${mediaType}/editor`, {
        headers: { 'X-Api-Key': apiKey },
        json: {
          applyTags: 'add',
          [mediaIdsKey]: mediaIds,
          tags: [tagId],
        },
      })
      .json();
  }

  /**
   * Fetches all import lists from the *arr service
   *
   * Only returns lists that:
   * - Have at least one tag
   * - Are enabled
   * - Have an MDBList URL
   *
   * @returns Promise resolving to array of filtered lists
   */
  async getLists(): Promise<List[]> {
    const { url, apiKey } = this.config;

    const lists = await ky
      .get<TList[]>(`${url}/api/v3/importlist`, {
        headers: { 'X-Api-Key': apiKey },
      })
      .json();

    return lists
      .filter(
        list =>
          list.tags.length > 0 &&
          this.getListEnabled(list) &&
          this.getListUrl(list).startsWith('https://mdblist.com'),
      )
      .map(list => ({
        id: list.id,
        name: list.name,
        tags: list.tags,
        url: this.getListUrl(list),
      }));
  }

  /**
   * Fetches all import lists with full tag information
   *
   * Enriches list data by replacing tag IDs with complete tag objects
   * containing both ID and label.
   *
   * @returns Promise resolving to array of lists with tag details
   */
  async getListsWithTags(): Promise<ListWithTags[]> {
    const [lists, tags] = await Promise.all([this.getLists(), this.getTags()]);

    return lists.map(list => ({
      ...list,
      tags: list.tags
        .map(tagId => tags.find(tag => tag.id === tagId))
        .filter(tag => tag !== undefined),
    }));
  }

  /**
   * Fetches all media items from the *arr service
   *
   * @returns Promise resolving to array of media items (movies, series, etc.)
   */
  async getMedia(): Promise<TMedia[]> {
    const { url, apiKey } = this.config;
    const mediaType = this.getMediaType();

    return await ky
      .get<TMedia[]>(`${url}/api/v3/${mediaType}`, {
        headers: { 'X-Api-Key': apiKey },
      })
      .json();
  }

  /**
   * Checks the system status of the *arr service
   *
   * Verifies that the API is accessible and the API key is valid.
   *
   * @returns Promise resolving to true if status check succeeds, false otherwise
   */
  async getStatus(): Promise<boolean> {
    const { url, apiKey } = this.config;
    try {
      await ky.get(`${url}/api/v3/system/status`, {
        headers: {
          'X-Api-Key': apiKey,
        },
      });

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Fetches all tags from the *arr service
   *
   * @returns Promise resolving to array of tags with IDs and labels
   */
  async getTags(): Promise<Tag[]> {
    const { url, apiKey } = this.config;
    return await ky
      .get<Tag[]>(`${url}/api/v3/tag`, { headers: { 'X-Api-Key': apiKey } })
      .json();
  }

  /**
   * Pings the *arr service to check basic connectivity
   *
   * This is a simple health check that doesn't require authentication.
   *
   * @returns Promise resolving to true if ping succeeds, false otherwise
   */
  async ping(): Promise<boolean> {
    const { url } = this.config;
    try {
      await ky.get(`${url}/ping`);

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Removes a tag from multiple media items
   *
   * @param tagId - The ID of the tag to remove
   * @param mediaIds - Array of media IDs to untag
   * @returns Promise resolving to updated media items
   *
   * @example
   * ```typescript
   * const updatedMovies = await radarrService.removeTag(5, [1, 2, 3]);
   * ```
   */
  async removeTag(tagId: number, mediaIds: number[]): Promise<TMedia[]> {
    const { url, apiKey } = this.config;
    const mediaType = this.getMediaType();
    const mediaIdsKey = this.getMediaIdsKey();

    return await ky
      .put<TMedia[]>(`${url}/api/v3/${mediaType}/editor`, {
        headers: { 'X-Api-Key': apiKey },
        json: {
          applyTags: 'remove',
          [mediaIdsKey]: mediaIds,
          tags: [tagId],
        },
      })
      .json();
  }

  /**
   * Validates the service configuration
   *
   * Performs a two-step validation:
   * 1. Pings the service to check connectivity
   * 2. Checks system status to verify API key
   *
   * @returns Promise resolving to validation result with success status and error details
   *
   * @example
   * ```typescript
   * const result = await radarrService.validateConfig();
   * if (result.success) {
   *   console.log(`Connected to ${result.url}`);
   * } else {
   *   console.error(`Validation failed: ${result.error}`);
   * }
   * ```
   */
  async validateConfig(): Promise<ValidateConfigResult> {
    const { apiKey, url } = this.config;

    const pingResult = await this.ping();
    if (!pingResult) {
      return {
        apiKey: null,
        error: 'ping-failed',
        success: false,
        url: null,
      };
    }

    const statusResult = await this.getStatus();
    if (!statusResult) {
      return {
        apiKey: null,
        error: 'status-failed',
        success: false,
        url,
      };
    }

    return {
      apiKey,
      success: true,
      url,
    };
  }
}
