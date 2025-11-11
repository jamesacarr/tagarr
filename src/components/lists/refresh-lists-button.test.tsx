import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { refreshLists } from '@/db/list/refresh-lists';

import { RefreshListsButton } from './refresh-lists-button';

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));
const mockToastError = vi.mocked(toast.error);

vi.mock('@/db/list/refresh-lists', () => ({
  refreshLists: vi.fn(),
}));
const mockRefreshLists = vi.mocked(refreshLists);

describe('RefreshListsButton', () => {
  beforeEach(() => {
    vi.stubEnv('TZ', 'UTC');
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-AU');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('appearance', () => {
    it('renders', () => {
      render(<RefreshListsButton />);
      expect(screen.getByText('Refresh')).toBeInTheDocument();
    });
  });

  describe('behaviour', () => {
    it('calls refreshLists when clicked', async () => {
      render(<RefreshListsButton />);
      await userEvent.click(screen.getByText('Refresh'));
      expect(mockRefreshLists).toHaveBeenCalled();
    });

    it('shows a loading state when refreshing', async () => {
      mockRefreshLists.mockReturnValueOnce(new Promise(() => {}));

      render(<RefreshListsButton />);
      await userEvent.click(screen.getByText('Refresh'));
      expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    });

    it('shows an error state when refreshing fails', async () => {
      mockRefreshLists.mockResolvedValueOnce(false);

      render(<RefreshListsButton />);
      await userEvent.click(screen.getByText('Refresh'));
      expect(mockToastError).toHaveBeenCalledWith('Failed to refresh lists');
    });
  });

  describe('accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(<RefreshListsButton />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
