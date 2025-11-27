import { HttpResponse, http } from 'msw';

import type { ListItemsResponse } from '@/services/mdblist/get-list-items';

import { movieListItems, seriesListItems } from '../fixtures/mdblist-fixtures';

interface Params {
  items?: ListItemsResponse[];
}

export const listFactory = ({ items }: Params = {}) =>
  http.get('https://mdblist.com/lists/:userId/:listId', ({ request }) => {
    const userAgent = request.headers.get('User-Agent');

    if (items) {
      return HttpResponse.json(items);
    }

    if (userAgent === 'Radarr') {
      return HttpResponse.json(movieListItems);
    }

    if (userAgent === 'Sonarr') {
      return HttpResponse.json(seriesListItems);
    }

    // Not actually what happens in the real world, but it's a good fallback for testing
    return HttpResponse.json({ error: 'Invalid User-Agent' }, { status: 400 });
  });

export const mdblistHandlers = [listFactory()];
