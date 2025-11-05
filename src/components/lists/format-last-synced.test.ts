import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { formatLastSynced } from './format-last-synced';

describe('formatLastSynced', () => {
  beforeEach(() => {
    vi.stubEnv('TZ', 'UTC');
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-AU');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('formats the last synced at', () => {
    expect(formatLastSynced('2021-01-01T00:00:00Z')).toEqual(
      '01/01/2021, 12:00:00 am',
    );
  });

  it('handles null last synced at', () => {
    expect(formatLastSynced(null)).toEqual('Never');
  });
});
