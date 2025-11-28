import { HttpResponse, http } from 'msw';
import type { MockInstance } from 'vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { logger } from '@/lib/logger';
import { server } from '@/mocks/server';

import { getListItems } from './get-list-items';

const TEST_URL = 'https://mdblist.com/lists/123/456';

describe('getListItems', () => {
  it('returns movies for Radarr', async () => {
    const listItems = await getListItems(TEST_URL, 'radarr');
    expect(listItems).toHaveLength(10);
    expect(listItems[0].mediatype).toBe('movie');
  });

  it('returns series for Sonarr', async () => {
    const listItems = await getListItems(TEST_URL, 'sonarr');
    expect(listItems).toHaveLength(10);
    expect(listItems[0].mediatype).toBe('show');
  });

  describe('error handling', () => {
    let errorSpy: MockInstance<typeof logger.error>;

    beforeEach(() => {
      // Mock the logger.error to suppress error output and verify it's called
      errorSpy = vi.spyOn(logger, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      errorSpy.mockRestore();
    });

    it('throws error when API returns 404', async () => {
      server.use(
        http.get('https://mdblist.com/lists/:userId/:listId', () =>
          HttpResponse.json({ error: 'Not found' }, { status: 404 }),
        ),
      );

      await expect(getListItems(TEST_URL, 'radarr')).rejects.toThrow(
        'Failed to fetch list items',
      );
    });

    it('throws error when API returns 500', async () => {
      server.use(
        http.get('https://mdblist.com/lists/:userId/:listId', () =>
          HttpResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
          ),
        ),
      );

      await expect(getListItems(TEST_URL, 'radarr')).rejects.toThrow(
        'Failed to fetch list items',
      );
    });

    it('throws error when API returns 503 Service Unavailable', async () => {
      server.use(
        http.get('https://mdblist.com/lists/:userId/:listId', () =>
          HttpResponse.json({ error: 'Service unavailable' }, { status: 503 }),
        ),
      );

      await expect(getListItems(TEST_URL, 'sonarr')).rejects.toThrow(
        'Failed to fetch list items',
      );
    });

    it('throws error when network request fails', async () => {
      server.use(
        http.get('https://mdblist.com/lists/:userId/:listId', () =>
          HttpResponse.error(),
        ),
      );

      await expect(getListItems(TEST_URL, 'radarr')).rejects.toThrow(
        'Failed to fetch list items',
      );
    });

    it('throws error when response is invalid JSON', async () => {
      server.use(
        http.get(
          'https://mdblist.com/lists/:userId/:listId',
          () =>
            new HttpResponse('Not valid JSON', {
              headers: { 'Content-Type': 'application/json' },
              status: 200,
            }),
        ),
      );

      await expect(getListItems(TEST_URL, 'radarr')).rejects.toThrow(
        'Failed to fetch list items',
      );
    });

    it('throws error when response is not JSON', async () => {
      server.use(
        http.get('https://mdblist.com/lists/:userId/:listId', () =>
          HttpResponse.text('Not JSON'),
        ),
      );

      await expect(getListItems(TEST_URL, 'radarr')).rejects.toThrow(
        'Failed to fetch list items',
      );
    });

    it('logs error with url context when request fails', async () => {
      server.use(
        http.get('https://mdblist.com/lists/:userId/:listId', () => {
          return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }),
      );

      try {
        await getListItems(TEST_URL, 'radarr');
      } catch {}

      expect(errorSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.any(Error),
          url: TEST_URL,
        }),
        'Failed to fetch list items',
      );
    });
  });
});
