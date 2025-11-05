import { ping } from '@/services/radarr';

export const validateRadarrConnection = async () => {
  'use step';

  await ping();
};
