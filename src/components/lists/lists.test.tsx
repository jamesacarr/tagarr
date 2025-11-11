import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { refreshLists } from '@/db/list/refresh-lists';
import type { ListWithTags } from '@/db/list/types';

import { Lists } from './lists';

const mockRefreshLists = vi.mocked(refreshLists);

vi.mock('@/db/list/refresh-lists', () => ({
  refreshLists: vi.fn(),
}));

const LISTS: ListWithTags[] = [
  {
    enabled: 1,
    id: 1,
    last_synced_at: '2021-01-01T00:00:00Z',
    name: 'Test List 1',
    tags: [{ id: 1, label: 'test-tag-1' }],
    url: 'https://test.com/1',
  },
  {
    enabled: 1,
    id: 2,
    last_synced_at: '2021-01-02T00:00:00Z',
    name: 'Test List 2',
    tags: [{ id: 2, label: 'test-tag-2' }],
    url: 'https://test.com/2',
  },
];

describe('Lists', () => {
  beforeEach(() => {
    vi.stubEnv('TZ', 'UTC');
  });

  describe('appearance', () => {
    it('displays the empty state when no lists', () => {
      render(<Lists lists={[]} />);
      expect(screen.getByText('No Synced Lists')).toBeInTheDocument();
    });

    it('displays the lists', () => {
      render(<Lists lists={LISTS} />);
      expect(screen.getByText('Test List 1')).toBeInTheDocument();
      expect(screen.getByText('Test List 2')).toBeInTheDocument();
    });

    it('has a refresh button', () => {
      render(<Lists lists={LISTS} />);
      expect(screen.getByText('Refresh')).toBeInTheDocument();
    });
  });

  describe('behaviour', () => {
    beforeEach(() => {
      mockRefreshLists.mockClear();
    });

    it('calls refreshLists when refresh button is clicked', async () => {
      render(<Lists lists={LISTS} />);
      await userEvent.click(screen.getByText('Refresh'));
      expect(mockRefreshLists).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(<Lists lists={LISTS} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
