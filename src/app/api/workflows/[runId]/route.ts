import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getRun } from 'workflow/api';

export const GET = async (
  _request: NextRequest,
  context: RouteContext<'/api/workflows/[runId]'>,
) => {
  const { runId } = await context.params;
  const run = getRun(runId);

  const createdAt = await run.createdAt;
  const status = await run.status;
  if (status !== 'completed') {
    return NextResponse.json({
      createdAt,
      runId,
      status,
    });
  }

  const result = await run.returnValue;
  const completedAt = await run.completedAt;
  return NextResponse.json({
    completedAt,
    createdAt,
    result,
    runId,
    status,
  });
};
