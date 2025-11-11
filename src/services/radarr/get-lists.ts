import ky from 'ky';

import type { ListResponse } from './types';
import { validateConfig } from './validate-config';

export const getLists = async () => {
  const { radarr_api_key, radarr_url } = await validateConfig();

  const response = await ky.get<ListResponse[]>(
    `${radarr_url}/api/v3/importlist`,
    {
      headers: {
        'X-Api-Key': radarr_api_key,
      },
    },
  );

  const data = await response.json();
  return data;
};
