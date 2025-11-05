'use server';

import type z from 'zod';

import { updateList as updateListQuery } from '@/db/list/queries';

import { schema } from './schema';

interface Result {
  success: boolean;
}

export const updateList = async (
  id: number,
  data: z.infer<typeof schema>,
): Promise<Result> => {
  const validatedData = await schema.safeParse({
    sync: data.sync,
    tag_id: data.tag_id,
  });

  if (!validatedData.success) {
    return { success: false };
  }

  try {
    await updateListQuery(id, validatedData.data);
  } catch {
    return { success: false };
  }

  return { success: true };
};
