'use server';

import { revalidatePath } from 'next/cache';
import { start } from 'workflow/api';

import { updateLists } from '@/workflows/update-lists';

export const refreshLists = async () => {
  try {
    const run = await start(updateLists);
    await run.returnValue;
    revalidatePath('/', 'page');
    return true;
  } catch {
    return false;
  }
};
