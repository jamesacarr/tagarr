import { ArrService } from './arr-service';
import type { Movie, MovieList } from './types';

/**
 * Service for interacting with Radarr API
 *
 * Provides movie-specific functionality for managing movies, lists, and tags in Radarr.
 * Extends the generic ArrService with Radarr-specific implementations.
 *
 * @example
 * ```typescript
 * const radarr = new RadarrService({
 *   url: 'http://localhost:7878',
 *   apiKey: 'your-api-key'
 * });
 *
 * const movies = await radarr.getMedia();
 * await radarr.addTag(5, [1, 2, 3]);
 * ```
 */
export class RadarrService extends ArrService<Movie, MovieList> {
  /**
   * Checks if a movie list is enabled
   *
   * @param list - The movie list to check
   * @returns True if the list is enabled
   */
  protected getListEnabled(list: MovieList): boolean {
    return list.enabled;
  }

  /**
   * Extracts the URL from a movie list's configuration fields
   *
   * @param list - The movie list to extract URL from
   * @returns The list URL
   * @throws {Error} When the list has no url field
   */
  protected getListUrl(list: MovieList): string {
    const urlField = list.fields.find(field => field.name === 'url');
    if (!urlField) {
      throw new Error(`${list.name} has no url field`);
    }

    return urlField.value;
  }

  /**
   * Gets the media type for Radarr API endpoints
   *
   * @returns 'movie'
   */
  protected getMediaType(): string {
    return 'movie';
  }

  /**
   * Gets the media IDs key for Radarr API requests
   *
   * @returns 'movieIds'
   */
  protected getMediaIdsKey(): string {
    return 'movieIds';
  }
}
