import ky from 'ky';

import type { SeriesResponse } from './types';

export const getSeries = async (url: string, apiKey: string) => {
  if (!url || !apiKey) {
    return [];
  }

  return await ky
    .get<SeriesResponse[]>(`${url}/api/v3/series`, {
      headers: {
        'X-Api-Key': apiKey,
      },
    })
    .json();
};
