import ky from 'ky';

import type { MovieResponse } from './types';
import { validateConfig } from './validate-config';

export const addTag = async (tagId: number, movieIds: number[]) => {
  const { radarr_api_key, radarr_url } = await validateConfig();

  const response = await ky.put<MovieResponse[]>(
    `${radarr_url}/api/v3/movie/editor`,
    {
      headers: {
        'X-Api-Key': radarr_api_key,
      },
      json: {
        applyTags: 'add',
        movieIds,
        tags: [tagId],
      },
    },
  );

  const data = await response.json();
  return data;
};
