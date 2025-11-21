import { FatalError } from 'workflow';

import { validateConfig } from '@/services/radarr';

interface Config {
  apiKey: string;
  url: string;
}

export const validateRadarrConfig = async (): Promise<Config> => {
  'use step';

  const config = await validateConfig();
  if (config.success) {
    return {
      apiKey: config.apiKey,
      url: config.url,
    };
  }

  if (config.error === 'missing-url') {
    throw new FatalError('Radarr URL is not set');
  }

  if (config.error === 'missing-api-key') {
    throw new FatalError('Radarr API key is not set');
  }

  if (config.error === 'ping-failed') {
    throw new FatalError('Radarr ping failed');
  }

  if (config.error === 'status-failed') {
    throw new FatalError('Radarr status failed');
  }

  // Will never get here but TypeScript needs it
  return config;
};
