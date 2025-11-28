import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { start } from 'workflow/api';

import { createLogger } from '@/lib/logger';
import { tagMedia } from '@/workflows/tag-media';

import type { WorkflowResponse } from '../types';

const log = createLogger('[API/Workflows/Movies]');

export const POST = async (
  request: NextRequest,
): Promise<NextResponse<WorkflowResponse>> => {
  const service = 'radarr';
  const sync = request.nextUrl.searchParams.has('sync');
  const url = request.nextUrl.pathname;

  log.info({ service, sync, url }, 'Workflow starting');

  const run = await start(tagMedia, [service]);
  const runId = run.runId;

  log.info({ runId, service, sync, url }, 'Workflow started');

  const createdAt = await run.createdAt;
  let status = await run.status;

  if (!sync) {
    log.info(
      { createdAt, runId, service, status, sync, url },
      'Returning status',
    );

    return NextResponse.json({
      createdAt,
      runId,
      status,
    });
  }

  const result = await run.returnValue;
  const completedAt = await run.completedAt;
  status = await run.status;

  log.info(
    { completedAt, createdAt, runId, service, status, url },
    'Workflow finished',
  );

  return NextResponse.json({
    completedAt,
    createdAt,
    result,
    runId,
    status,
  });
};
