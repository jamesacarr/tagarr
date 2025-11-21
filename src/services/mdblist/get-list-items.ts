import ky from 'ky';
import { capitalize } from 'radash';

interface ListItemsResponse {
  adult: number;
  id: number; // This is the tmdb id number
  imdb_id: string | null;
  mediatype: string;
  rank: number;
  release_year: number;
  title: string;
  tvdb_id: number | null;
}

export const getListItems = async (
  url: string,
  service: 'radarr' | 'sonarr',
) => {
  return await ky
    .get<ListItemsResponse[]>(url, {
      headers: {
        // Using Radarr/Sonarr as the user agent in order to get the correct response format
        'User-Agent': capitalize(service),
      },
    })
    .json();
};
