import { RadarrService } from './radarr-service';
import { SonarrService } from './sonarr-service';

/**
 * Type-safe service type resolution based on service name
 *
 * @template T - The service type ('radarr' or 'sonarr')
 */
type Service<T> = T extends 'radarr'
  ? InstanceType<typeof RadarrService>
  : T extends 'sonarr'
    ? InstanceType<typeof SonarrService>
    : never;

/**
 * Factory function to create an *arr service instance
 *
 * Creates a type-safe instance of either RadarrService or SonarrService based
 * on the service parameter. The return type is automatically inferred based on
 * the service parameter.
 *
 * @template T - The service type ('radarr' or 'sonarr')
 * @param service - The type of service to create
 * @param url - The base URL of the *arr service
 * @param apiKey - The API key for authentication
 * @returns A configured instance of the requested service
 * @throws {Error} When an invalid service type is provided
 *
 * @example
 * ```typescript
 * // Creates a RadarrService instance
 * const radarr = createArrService('radarr', 'http://localhost:7878', 'api-key');
 * const movies = await radarr.getMedia(); // TypeScript knows this is Movie[]
 *
 * // Creates a SonarrService instance
 * const sonarr = createArrService('sonarr', 'http://localhost:8989', 'api-key');
 * const series = await sonarr.getMedia(); // TypeScript knows this is Series[]
 * ```
 */
export const createArrService = <T extends 'radarr' | 'sonarr'>(
  service: T,
  url: string,
  apiKey: string,
): Service<T> => {
  switch (service) {
    case 'radarr':
      return new RadarrService({ apiKey, url }) as Service<T>;
    case 'sonarr':
      return new SonarrService({ apiKey, url }) as Service<T>;
    default:
      throw new Error(`Invalid service: ${service}`);
  }
};
