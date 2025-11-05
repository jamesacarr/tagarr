import { revalidatePath } from 'next/cache';

// biome-ignore lint/suspicious/useAwait: needs to be async for workflows
export const revalidateCache = async () => {
  'use step';

  revalidatePath('/', 'page');
};
