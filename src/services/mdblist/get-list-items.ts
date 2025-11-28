import ky from 'ky';
import { capitalize } from 'radash';

import { createLogger } from '@/lib/logger';

const log = createLogger('[MDBList/GetListItems]');

export interface ListItemsResponse {
  adult: number;
  id: number; // This is the tmdb id number
  imdb_id: string | null;
  mediatype: string;
  rank: number;
  release_year: number;
  title: string;
  tvdbid: number | null;
}

const RETRY_LIMIT = process.env.NODE_ENV !== 'test' ? 2 : 0;

export const getListItems = async (
  url: string,
  service: 'radarr' | 'sonarr',
) => {
  try {
    return await ky
      .get<ListItemsResponse[]>(url, {
        headers: {
          // Using Radarr/Sonarr as the user agent in order to get the correct response format
          'User-Agent': capitalize(service),
        },
        retry: RETRY_LIMIT,
      })
      .json();
  } catch (error) {
    log.error({ error, url }, 'Failed to fetch list items');
    throw new Error('Failed to fetch list items');
  }
};
