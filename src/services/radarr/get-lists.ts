import ky from 'ky';

import type { ListResponse } from './types';

export const getLists = async (url: string, apiKey: string) => {
  if (!url || !apiKey) {
    return [];
  }

  const lists = await ky
    .get<ListResponse[]>(`${url}/api/v3/importlist`, {
      headers: {
        'X-Api-Key': apiKey,
      },
    })
    .json();

  return lists.filter(list => list.enabled);
};
