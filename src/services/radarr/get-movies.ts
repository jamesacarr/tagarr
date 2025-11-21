import ky from 'ky';

import type { MovieResponse } from './types';

export const getMovies = async (url: string, apiKey: string) => {
  if (!url || !apiKey) {
    return [];
  }

  return await ky
    .get<MovieResponse[]>(`${url}/api/v3/movie`, {
      headers: {
        'X-Api-Key': apiKey,
      },
    })
    .json();
};
