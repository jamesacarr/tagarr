import z from 'zod';

export const schema = z.object({
  mdblist_api_key: z.string().optional(),
  radarr_api_key: z.string().optional(),
  radarr_url: z.union([z.url(), z.literal('')]).optional(),
  sonarr_api_key: z.string().optional(),
  sonarr_url: z.union([z.url(), z.literal('')]).optional(),
});
