import ky from 'ky';
import { FatalError } from 'workflow';

import type { MovieResponse } from './types';
import { validateConfig } from './validate-config';

export const ping = async () => {
  const { radarr_api_key, radarr_url } = await validateConfig();

  const response = await ky.get<MovieResponse[]>(`${radarr_url}/ping`, {
    headers: {
      'X-Api-Key': radarr_api_key,
    },
  });

  if (!response.ok) {
    throw new FatalError('Radarr connection is unavailable');
  }
};
