import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { refreshLists } from '@/db/list/refresh-lists';

import { ListsEmpty } from './lists-empty';

const mockRefreshLists = vi.mocked(refreshLists);

vi.mock('@/db/list/refresh-lists', () => ({
  refreshLists: vi.fn(),
}));

describe('ListsEmpty', () => {
  beforeEach(() => {
    vi.stubEnv('TZ', 'UTC');
  });

  describe('appearance', () => {
    it('displays the title', () => {
      render(<ListsEmpty />);
      expect(screen.getByText('No Synced Lists')).toBeInTheDocument();
    });

    it('has a refresh button', () => {
      render(<ListsEmpty />);
      expect(screen.getByText('Refresh')).toBeInTheDocument();
    });
  });

  describe('behaviour', () => {
    it('calls refreshLists when refresh button is clicked', async () => {
      render(<ListsEmpty />);
      await userEvent.click(screen.getByText('Refresh'));
      expect(mockRefreshLists).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(<ListsEmpty />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
