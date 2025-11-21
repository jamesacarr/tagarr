import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { start } from 'workflow/api';

import { logger } from '@/lib/logger';
import { tagMedia } from '@/workflows/tag-media';

export const POST = async (request: NextRequest) => {
  const sync = request.nextUrl.searchParams.has('sync');
  logger.info(
    { service: 'sonarr', sync, url: request.nextUrl.pathname },
    'Series tagging API endpoint called',
  );

  const run = await start(tagMedia, ['sonarr']);
  const runId = run.runId;

  if (!sync) {
    logger.info({ runId }, 'Series tagging started');
    return NextResponse.json({
      message: 'Series tagging started',
      runId,
    });
  }

  logger.info({ runId }, 'Series tagging waiting for completion');

  const result = await run.returnValue;
  const createdAt = await run.createdAt;
  const completedAt = await run.completedAt;
  const status = await run.status;

  logger.info(
    { completedAt, createdAt, runId, status },
    'Series tagging completed',
  );

  return NextResponse.json({
    completedAt,
    createdAt,
    result,
    runId,
    status,
  });
};
