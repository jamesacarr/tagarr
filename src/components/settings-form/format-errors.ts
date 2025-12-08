import type { z } from 'zod';

export const formatErrors = (errors: z.core.$ZodIssue[]) =>
  errors
    .filter(error => error.path.length > 0)
    .map(error => ({
      message: error.message,
      path: error.path.join('.'),
      type: error.code,
    }));
