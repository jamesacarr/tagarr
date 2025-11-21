import ky from 'ky';

import type { TagResponse } from './types';

export const getTags = async (url: string, apiKey: string) => {
  if (!url || !apiKey) {
    return [];
  }

  return await ky
    .get<TagResponse[]>(`${url}/api/v3/tag`, {
      headers: {
        'X-Api-Key': apiKey,
      },
    })
    .json();
};
