import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createLogger } from '@/lib/logger';

const log = createLogger('[API/Ping]');

interface PingResponse {
  message: string;
}

// biome-ignore lint/suspicious/useAwait: API route needs to be async
export const GET = async (
  request: NextRequest,
): Promise<NextResponse<PingResponse>> => {
  const url = request.nextUrl.pathname;

  log.info({ url }, 'Pinging');

  return NextResponse.json({ message: 'ok' });
};
