import { FatalError } from 'workflow';

import { getConfig } from '@/db/config/queries';

export const validateConfig = async () => {
  const { radarr_api_key, radarr_url } = await getConfig();

  if (!radarr_url) {
    throw new FatalError('Radarr URL is not set');
  }

  if (!radarr_api_key) {
    throw new FatalError('Radarr API key is not set');
  }

  return {
    radarr_api_key,
    radarr_url,
  };
};
