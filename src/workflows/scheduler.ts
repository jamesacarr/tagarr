// biome-ignore-all lint/suspicious/noConsole: we use console.log for logging

import cron from 'node-cron';
import type { Run } from 'workflow/api';
import { start } from 'workflow/api';

import { getAllSyncedLists } from '@/db/list/queries';
import { tagMovies } from '@/workflows/tag-movies';
import { updateLists } from '@/workflows/update-lists';
import { updateTags } from '@/workflows/update-tags';

const SCHEDULE = '0 0 * * *';

const logWorkflow = async <T extends Run<unknown>>(run: T) => {
  await run.returnValue;
  const name = await run.workflowName;
  const createdAt = await run.createdAt;
  const completedAt = await run.completedAt;
  const status = await run.status;

  console.log(
    '[Workflow]',
    createdAt,
    '-',
    completedAt,
    run.runId,
    name,
    status,
  );
};

export const scheduleWorkflows = () => {
  console.log('[Workflow] Scheduling', SCHEDULE);

  cron.schedule(SCHEDULE, async () => {
    console.log('[Workflow] Starting...');

    await logWorkflow(await start(updateLists));
    await logWorkflow(await start(updateTags));

    // Deliberately doing this synchronously to avoid race conditions
    // on the Radarr server.
    const lists = await getAllSyncedLists();
    for (const list of lists) {
      await logWorkflow(await start(tagMovies, [list.id]));
    }

    console.log('[Workflow] Completed');
  });
};
