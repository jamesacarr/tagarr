import cron from 'node-cron';
import type { Run } from 'workflow/api';
import { start } from 'workflow/api';

import { logger } from '@/lib/logger';
import { tagMedia } from '@/workflows/tag-media';

const SCHEDULE = '0 0 * * *';

const logWorkflow = async <T extends Run<unknown>>(run: T) => {
  await run.returnValue;
  const name = await run.workflowName;
  const createdAt = await run.createdAt;
  const completedAt = await run.completedAt;
  const status = await run.status;

  logger.info(
    { completedAt, createdAt, name, runId: run.runId, status },
    'Workflow completed',
  );
};

export const scheduleWorkflows = () => {
  logger.info({ schedule: SCHEDULE }, 'Scheduling workflows');

  cron.schedule(SCHEDULE, async () => {
    logger.info('Starting workflows');

    await logWorkflow(await start(tagMedia, ['radarr']));
    await logWorkflow(await start(tagMedia, ['sonarr']));

    logger.info('Workflows completed');
  });
};
