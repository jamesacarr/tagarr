'use server';

import { db } from '../db';
import type { ConfigUpdate } from './types';
import { validateConfig } from './validate-config';

const DEFAULT_CONFIG = {
  mdblist_api_key: '',
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

  return validateConfig(config ?? DEFAULT_CONFIG);
};

export const updateConfig = async (data: ConfigUpdate) => {
  const validatedConfig = validateConfig(data);

  const config = await db
    .updateTable('config')
    .set(validatedConfig)
    .returningAll()
    .executeTakeFirst();

  return config;
};
