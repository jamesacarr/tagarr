'use server';

import { revalidatePath } from 'next/cache';
import { start } from 'workflow/api';

import { updateTags } from '@/workflows/update-tags';

export const refreshTags = async () => {
  try {
    const run = await start(updateTags);
    await run.returnValue;
    revalidatePath('/[id]', 'page');
    return true;
  } catch {
    return false;
  }
};
