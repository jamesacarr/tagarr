import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { start } from 'workflow/api';

import { updateTags } from '@/workflows/update-tags';

export const POST = async (request: NextRequest) => {
  const run = await start(updateTags);
  const runId = run.runId;

  if (!request.nextUrl.searchParams.has('sync')) {
    return NextResponse.json({
      message: 'Tag update started',
      runId,
    });
  }

  const result = await run.returnValue;
  const createdAt = await run.createdAt;
  const completedAt = await run.completedAt;
  const status = await run.status;
  return NextResponse.json({
    completedAt,
    createdAt,
    result,
    runId,
    status,
  });
};
