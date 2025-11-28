import { FatalError, getStepMetadata } from 'workflow';

import { getConfig } from '@/db/config/queries';
import { createLogger } from '@/lib/logger';
import { createArrService } from '@/services/arr-service';

const log = createLogger('[Workflow/TagMedia/ValidateConfig]');

interface Config {
  apiKey: string | undefined;
  url: string | undefined;
}

export const validateConfig = async (
  service: 'radarr' | 'sonarr',
): Promise<Config> => {
  'use step';

  const context = getStepMetadata();
  log.info({ context, service }, 'Starting');

  const config = await getConfig();
  log.debug({ config, context }, 'Config');

  if (!config[`${service}_url`]) {
    log.warn({ context, service }, 'URL is not set');

    return {
      apiKey: undefined,
      url: undefined,
    };
  }

  if (!config[`${service}_api_key`]) {
    log.warn({ context, service }, 'API key is not set');

    return {
      apiKey: undefined,
      url: config[`${service}_url`],
    };
  }

  const arrService = createArrService(
    service,
    config[`${service}_url`],
    config[`${service}_api_key`],
  );
  const result = await arrService.validateConfig();
  if (result.success) {
    log.info({ context, service }, 'Validated');

    return {
      apiKey: result.apiKey,
      url: result.url,
    };
  }

  log.error({ context, error: result.error, service }, 'Validation failed');

  if (result.error === 'ping-failed') {
    throw new FatalError(`[${service}] ping failed`);
  }

  if (result.error === 'status-failed') {
    throw new FatalError(`[${service}] status failed`);
  }

  throw new FatalError(`[${service}] unknown config error`);
};
