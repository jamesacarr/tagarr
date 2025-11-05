import z from 'zod';

export const schema = z
  .object({
    sync: z.number(),
    tag_id: z.number().nullable(),
  })
  .refine(data => !data.sync || data.tag_id, {
    message: 'Tag is required when sync is enabled',
    path: ['tag_id'],
  });
