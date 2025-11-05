import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { start } from 'workflow/api';

import { getAllSyncedLists } from '@/db/list/queries';
import { tagMovies } from '@/workflows/tag-movies';

export const POST = async (request: NextRequest) => {
  const lists = await getAllSyncedLists();
  const runs = await Promise.all(
    lists.map(list => start(tagMovies, [list.id])),
  );

  if (!request.nextUrl.searchParams.has('sync')) {
    return NextResponse.json({
      message: 'Movie tagging started',
      runIds: runs.map(run => run.runId),
    });
  }

  const results = await Promise.all(
    runs.map(async run => {
      const result = await run.returnValue;
      const createdAt = await run.createdAt;
      const completedAt = await run.completedAt;
      const status = await run.status;
      return {
        completedAt,
        createdAt,
        result,
        runId: run.runId,
        status,
      };
    }),
  );

  return NextResponse.json(results);
};
