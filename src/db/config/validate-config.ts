import type { ConfigUpdate } from './types';

// Ensure URLs always ends with a slash
export const validateConfig = (config: ConfigUpdate) => {
  if ('radarr_url' in config && config.radarr_url) {
    config.radarr_url = config.radarr_url.endsWith('/')
      ? config.radarr_url.slice(0, -1)
      : config.radarr_url;
  }
  if ('sonarr_url' in config && config.sonarr_url) {
    config.sonarr_url = config.sonarr_url.endsWith('/')
      ? config.sonarr_url.slice(0, -1)
      : config.sonarr_url;
  }

  return config;
};
