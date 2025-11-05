import ky from 'ky';

import { MDBLIST_API_URL } from './constants';
import { validateConfig } from './validate-config';

interface ListItem {
  adult: number;
  id: number;
  imdb_id: string | null;
  language: string;
  mediatype: string;
  rank: number;
  release_year: number;
  spoken_language: string;
  title: string;
  tvdb_id: number | null;
}

interface ListItemsResponse {
  movies: ListItem[];
  shows: ListItem[];
}

export const getListItems = async (id: number) => {
  const { mdblist_api_key } = await validateConfig();

  const response = await ky.get<ListItemsResponse>(
    `${MDBLIST_API_URL}/lists/${id}/items`,
    {
      searchParams: {
        apikey: mdblist_api_key,
        limit: 1000,
        offset: 0,
      },
    },
  );

  return await response.json();
};
