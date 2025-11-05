import ky from 'ky';

import type { MovieResponse } from './types';
import { validateConfig } from './validate-config';

export const getMovies = async () => {
  const { radarr_api_key, radarr_url } = await validateConfig();

  const response = await ky.get<MovieResponse[]>(`${radarr_url}/api/v3/movie`, {
    headers: {
      'X-Api-Key': radarr_api_key,
    },
  });

  const data = await response.json();
  return data;
};
