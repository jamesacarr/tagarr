import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getRun } from 'workflow/api';

import { createLogger } from '@/lib/logger';

import type { WorkflowResponse } from '../types';

const log = createLogger('[API/Workflows/:runId]');

export const GET = async (
  request: NextRequest,
  context: RouteContext<'/api/workflows/[runId]'>,
): Promise<NextResponse<WorkflowResponse>> => {
  const url = request.nextUrl.pathname;
  const { runId } = await context.params;

  log.info({ runId, url }, 'Fetching workflow');

  const run = getRun(runId);

  const createdAt = await run.createdAt;
  const status = await run.status;

  if (status !== 'completed') {
    log.info({ createdAt, runId, status, url }, 'Workflow status');

    return NextResponse.json({
      createdAt,
      runId,
      status,
    });
  }

  const result = await run.returnValue;
  const completedAt = await run.completedAt;

  log.info({ completedAt, createdAt, runId, status, url }, 'Workflow status');

  return NextResponse.json({
    completedAt,
    createdAt,
    result,
    runId,
    status,
  });
};
