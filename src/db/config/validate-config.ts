import type { ConfigUpdate } from './types';

// Ensure URLs always ends with a slash
export const validateConfig = (config: ConfigUpdate) => ({
  ...config,
  radarr_url: config.radarr_url?.endsWith('/')
    ? config.radarr_url.slice(0, -1)
    : config.radarr_url,
  sonarr_url: config.sonarr_url?.endsWith('/')
    ? config.sonarr_url.slice(0, -1)
    : config.sonarr_url,
});
