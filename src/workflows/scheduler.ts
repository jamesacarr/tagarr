import cron from 'node-cron';
import type { Run } from 'workflow/api';
import { start } from 'workflow/api';

import { createLogger } from '@/lib/logger';
import { tagMedia } from '@/workflows/tag-media';

const SCHEDULE = '0 0 * * *';

const log = createLogger('[Scheduler]');

const logWorkflow = async <T extends Run<unknown>>(run: T) => {
  const runId = run.runId;
  const workflowName = await run.workflowName;

  log.info({ runId, workflowName }, 'Workflow starting');

  await run.returnValue;
  const createdAt = await run.createdAt;
  const completedAt = await run.completedAt;
  const status = await run.status;

  log.info(
    { completedAt, createdAt, runId, status, workflowName },
    'Workflow completed',
  );
};

export const scheduleWorkflows = () => {
  log.info({ schedule: SCHEDULE }, 'Initializing');

  cron.schedule(SCHEDULE, async () => {
    log.info('Starting');

    await logWorkflow(await start(tagMedia, ['radarr']));
    await logWorkflow(await start(tagMedia, ['sonarr']));

    log.info('Completed');
  });
};
