/**
 * @module arr-service
 *
 * Generic service layer for interacting with *arr applications (Radarr, Sonarr, etc.)
 *
 * This module provides a unified interface for managing media libraries, tags, and import lists
 * across different *arr services. It uses a factory pattern to create service instances with
 * full type safety.
 *
 * @example
 * ```typescript
 * import { createArrService } from '@/services/arr-service';
 *
 * // Create a Radarr service
 * const radarr = createArrService('radarr', 'http://localhost:7878', 'api-key');
 * const movies = await radarr.getMedia();
 * await radarr.addTag(5, [1, 2, 3]);
 *
 * // Create a Sonarr service
 * const sonarr = createArrService('sonarr', 'http://localhost:8989', 'api-key');
 * const series = await sonarr.getMedia();
 * ```
 */

export { createArrService } from './create-arr-service';
export type { List, Tag } from './types';
