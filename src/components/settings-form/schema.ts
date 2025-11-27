import z from 'zod';

export const schema = z.object({
  radarr_api_key: z.string(),
  radarr_url: z.union([z.url(), z.literal('')]),
  sonarr_api_key: z.string(),
  sonarr_url: z.union([z.url(), z.literal('')]),
});
