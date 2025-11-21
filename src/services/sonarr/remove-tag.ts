import ky from 'ky';

import type { SeriesResponse } from './types';

export const removeTag = async (
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
        applyTags: 'remove',
        seriesIds,
        tags: [tagId],
      },
    })
    .json();
};
