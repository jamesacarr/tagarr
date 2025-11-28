'use server';

import { db } from '../db';
import { removeTrailingSlashes } from './remove-trailing-slashes';
import type { ConfigUpdate } from './types';

const DEFAULT_CONFIG = {
  radarr_api_key: '',
  radarr_url: '',
  sonarr_api_key: '',
  sonarr_url: '',
};

export const getConfig = async () => {
  const config = await db
    .selectFrom('config')
    .selectAll()
    .orderBy('id', 'asc')
    .limit(1)
    .executeTakeFirst();

  return config ?? DEFAULT_CONFIG;
};

export const updateConfig = async (data: ConfigUpdate) => {
  const fixedData = removeTrailingSlashes(data);

  const config = await db
    .updateTable('config')
    .set(fixedData)
    .returningAll()
    .executeTakeFirst();

  return config;
};
