import { FatalError } from 'workflow';

import { validateConfig } from '@/services/sonarr';

interface Config {
  apiKey: string;
  url: string;
}

export const validateSonarrConfig = async (): Promise<Config> => {
  'use step';

  const config = await validateConfig();
  if (config.success) {
    return {
      apiKey: config.apiKey,
      url: config.url,
    };
  }

  if (config.error === 'missing-url') {
    throw new FatalError('Sonarr URL is not set');
  }

  if (config.error === 'missing-api-key') {
    throw new FatalError('Sonarr API key is not set');
  }

  if (config.error === 'ping-failed') {
    throw new FatalError('Sonarr ping failed');
  }

  if (config.error === 'status-failed') {
    throw new FatalError('Sonarr status failed');
  }

  // Will never get here but TypeScript needs it
  return config;
};
