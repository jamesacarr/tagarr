import ky from 'ky';

import type { SeriesResponse } from './types';

export const addTag = async (
  url: string,
  apiKey: string,
  tagId: number,
  seriesIds: number[],
) => {
  if (!url || !apiKey) {
    return [];
  }

  return await ky
    .put<SeriesResponse[]>(`${url}/api/v3/series/editor`, {
      headers: {
        'X-Api-Key': apiKey,
      },
      json: {
        applyTags: 'add',
        seriesIds,
        tags: [tagId],
      },
    })
    .json();
};
