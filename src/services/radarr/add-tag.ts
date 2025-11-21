import ky from 'ky';

import type { MovieResponse } from './types';

export const addTag = async (
  url: string,
  apiKey: string,
  tagId: number,
  movieIds: number[],
) => {
  if (!url || !apiKey) {
    return [];
  }

  return await ky
    .put<MovieResponse[]>(`${url}/api/v3/movie/editor`, {
      headers: {
        'X-Api-Key': apiKey,
      },
      json: {
        applyTags: 'add',
        movieIds,
        tags: [tagId],
      },
    })
    .json();
};
