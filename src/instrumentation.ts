// Need to use import(...) rather than importing files directly to avoid errors
// when building for the Edge runtime
export const register = async () => {
  if (process.env.NEXT_RUNTIME !== 'nodejs') {
    return;
  }

  // Run migrations
  const { migrateToLatest } = await import('@/db/migrate-to-latest');
  await migrateToLatest();

  // Schedule workflows
  const { scheduleWorkflows } = await import('@/workflows/scheduler');
  scheduleWorkflows();
};
