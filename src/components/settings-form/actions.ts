'use server';

import { revalidatePath } from 'next/cache';

import { updateConfig } from '@/db/config/queries';

import { formatErrors } from './format-errors';
import type { Fields } from './schema';
import { schema } from './schema';

interface SuccessResult {
  success: true;
}

interface ErrorResult {
  success: false;
  errors: Array<{
    message: string;
    path: string;
    type: string;
  }>;
}

export const updateSettings = async (
  data: Fields,
): Promise<SuccessResult | ErrorResult> => {
  const validatedData = schema.safeParse({
    radarr_api_key: data.radarr_api_key,
    radarr_url: data.radarr_url,
    sonarr_api_key: data.sonarr_api_key,
    sonarr_url: data.sonarr_url,
  });

  if (!validatedData.success) {
    return {
      errors: formatErrors(validatedData.error.issues),
      success: false,
    };
  }

  await updateConfig(validatedData.data);
  revalidatePath('/settings');

  return {
    success: true,
  };
};
