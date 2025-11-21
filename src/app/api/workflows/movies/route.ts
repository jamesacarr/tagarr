import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { start } from 'workflow/api';

import { logger } from '@/lib/logger';
import { tagMedia } from '@/workflows/tag-media';

export const POST = async (request: NextRequest) => {
  const sync = request.nextUrl.searchParams.has('sync');
  logger.info(
    { service: 'radarr', sync, url: request.nextUrl.pathname },
    'Movie tagging API endpoint called',
  );

  const run = await start(tagMedia, ['radarr']);
  const runId = run.runId;

  if (!sync) {
    logger.info({ runId }, 'Movie tagging started');
    return NextResponse.json({
      message: 'Movie tagging started',
      runId,
    });
  }

  logger.info({ runId }, 'Movie tagging waiting for completion');

  const result = await run.returnValue;
  const createdAt = await run.createdAt;
  const completedAt = await run.completedAt;
  const status = await run.status;

  logger.info(
    { completedAt, createdAt, runId, status },
    'Movie tagging completed',
  );

  return NextResponse.json({
    completedAt,
    createdAt,
    result,
    runId,
    status,
  });
};
