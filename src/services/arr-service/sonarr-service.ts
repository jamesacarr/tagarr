import { ArrService } from './arr-service';
import type { Series, SeriesList } from './types';

/**
 * Service for interacting with Sonarr API
 *
 * Provides series-specific functionality for managing TV series, lists, and tags in Sonarr.
 * Extends the generic ArrService with Sonarr-specific implementations.
 *
 * @example
 * ```typescript
 * const sonarr = new SonarrService({
 *   url: 'http://localhost:8989',
 *   apiKey: 'your-api-key'
 * });
 *
 * const series = await sonarr.getMedia();
 * await sonarr.addTag(5, [1, 2, 3]);
 * ```
 */
export class SonarrService extends ArrService<Series, SeriesList> {
  /**
   * Checks if a series list is enabled for automatic addition
   *
   * @param list - The series list to check
   * @returns True if automatic addition is enabled for the list
   */
  protected getListEnabled(list: SeriesList): boolean {
    return list.enableAutomaticAdd;
  }

  /**
   * Extracts the base URL from a series list's configuration fields
   *
   * @param list - The series list to extract URL from
   * @returns The list base URL
   * @throws {Error} When the list has no baseUrl field
   */
  protected getListUrl(list: SeriesList): string {
    const baseUrlField = list.fields.find(field => field.name === 'baseUrl');
    if (!baseUrlField) {
      throw new Error(`${list.name} has no baseUrl field`);
    }

    return baseUrlField.value;
  }

  /**
   * Gets the media type for Sonarr API endpoints
   *
   * @returns 'series'
   */
  protected getMediaType(): string {
    return 'series';
  }

  /**
   * Gets the media IDs key for Sonarr API requests
   *
   * @returns 'seriesIds'
   */
  protected getMediaIdsKey(): string {
    return 'seriesIds';
  }
}
