// biome-ignore-all lint/suspicious/noConsole: we use console.log for logging

import cron from 'node-cron';
import type { Run } from 'workflow/api';
import { start } from 'workflow/api';

import { tagMedia } from '@/workflows/tag-media';

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

    await logWorkflow(await start(tagMedia, ['radarr']));
    await logWorkflow(await start(tagMedia, ['sonarr']));

    console.log('[Workflow] Completed');
  });
};
