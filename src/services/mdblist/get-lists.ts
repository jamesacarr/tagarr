import ky from 'ky';

import { MDBLIST_API_URL } from './constants';
import { validateConfig } from './validate-config';

export interface ListResponse {
  description: string;
  dynamic: boolean;
  id: number;
  items: number;
  likes: number | null;
  mediatype: string;
  name: string;
  private: boolean;
  slug: string;
  user_id: number;
  user_name: string;
}

export const getLists = async () => {
  const { mdblist_api_key } = await validateConfig();

  const response = await ky.get<ListResponse[]>(
    `${MDBLIST_API_URL}/lists/user`,
    {
      searchParams: { apikey: mdblist_api_key },
    },
  );

  return await response.json();
};
