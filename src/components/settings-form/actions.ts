'use server';

import { revalidatePath } from 'next/cache';
import z from 'zod';

import { updateConfig } from '@/db/config/queries';

import { schema } from './schema';

export const updateSettings = async (data: z.infer<typeof schema>) => {
  const validatedData = schema.safeParse({
    mdblist_api_key: data.mdblist_api_key,
    radarr_api_key: data.radarr_api_key,
    radarr_url: data.radarr_url,
    sonarr_api_key: data.sonarr_api_key,
    sonarr_url: data.sonarr_url,
  });

  if (!validatedData.success) {
    return {
      errors: z.treeifyError(validatedData.error),
    };
  }

  await updateConfig(validatedData.data);
  revalidatePath('/settings');
};
