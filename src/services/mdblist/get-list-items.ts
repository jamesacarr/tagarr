import ky from 'ky';

interface ListItemsResponse {
  adult: number;
  id: number;
  imdb_id: string | null;
  mediatype: string;
  rank: number;
  release_year: number;
  title: string;
  tvdb_id: number | null;
}

export const getListItems = async (url: string) => {
  const response = await ky.get<ListItemsResponse[]>(url, {
    headers: {
      // Using Radarr as the user agent in order to get the correct response format
      'User-Agent': 'Radarr',
    },
  });

  return await response.json();
};
