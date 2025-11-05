import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { refreshLists } from '@/db/list/refresh-lists';
import type { ListWithTag } from '@/db/list/types';

import { Lists } from './lists';

const mockRefreshLists = vi.mocked(refreshLists);

vi.mock('@/db/list/refresh-lists', () => ({
  refreshLists: vi.fn(),
}));

const LISTS: ListWithTag[] = [
  {
    description: 'Test Description 1',
    id: 1,
    last_synced_at: '2021-01-01T00:00:00Z',
    name: 'Test List 1',
    slug: 'test-slug-1',
    sync: 1,
    tag_id: 1,
    tag_label: 'test-tag-1',
    url: 'https://test.com/1',
  },
  {
    description: 'Test Description 2',
    id: 2,
    last_synced_at: '2021-01-02T00:00:00Z',
    name: 'Test List 2',
    slug: 'test-slug-2',
    sync: 1,
    tag_id: 2,
    tag_label: 'test-tag-2',
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
