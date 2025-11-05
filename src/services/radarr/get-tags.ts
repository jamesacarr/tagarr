import ky from 'ky';

import { validateConfig } from './validate-config';

interface TagResponse {
  id: number;
  label: string;
}

export const getTags = async () => {
  const { radarr_api_key, radarr_url } = await validateConfig();

  const response = await ky.get<TagResponse[]>(`${radarr_url}/api/v3/tag`, {
    headers: {
      'X-Api-Key': radarr_api_key,
    },
  });

  const data = await response.json();
  return data;
};
