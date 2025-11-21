import { FatalError } from 'workflow';

import { getConfig } from '@/db/config/queries';
import { createArrService } from '@/services/arr-service';

interface Config {
  apiKey: string;
  url: string;
}

export const validateConfig = async (
  service: 'radarr' | 'sonarr',
): Promise<Config> => {
  'use step';

  const config = await getConfig();
  if (!config[`${service}_url`]) {
    throw new FatalError(`[${service}] URL is not set`);
  }

  if (!config[`${service}_api_key`]) {
    throw new FatalError(`[${service}] API key is not set`);
  }

  const arrService = createArrService(
    service,
    config[`${service}_url`],
    config[`${service}_api_key`],
  );
  const result = await arrService.validateConfig();
  if (result.success) {
    return {
      apiKey: result.apiKey,
      url: result.url,
    };
  }

  if (result.error === 'ping-failed') {
    throw new FatalError(`[${service}] ping failed`);
  }

  if (result.error === 'status-failed') {
    throw new FatalError(`[${service}] status failed`);
  }

  throw new FatalError(`[${service}] unknown config error`);
};
