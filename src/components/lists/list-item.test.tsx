import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import type { ListWithTag } from '@/db/list/types';

import { ListItem } from './list-item';

const LIST_ITEM: ListWithTag = {
  description: 'Test Description',
  id: 1,
  last_synced_at: '2021-01-01T00:00:00Z',
  name: 'Test List',
  slug: 'test-slug',
  sync: 1,
  tag_id: 1,
  tag_label: 'test-tag',
  url: 'https://test.com',
};

describe('ListItem', () => {
  beforeEach(() => {
    vi.stubEnv('TZ', 'UTC');
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-AU');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('appearance', () => {
    it('displays the list name', () => {
      render(<ListItem list={LIST_ITEM} />);
      expect(screen.getByText('Test List')).toBeInTheDocument();
    });

    it('displays the list tag', () => {
      render(<ListItem list={LIST_ITEM} />);
      expect(screen.getByText('test-tag')).toBeInTheDocument();
    });

    it('displays the last synced at', () => {
      render(<ListItem list={LIST_ITEM} />);
      expect(
        screen.getByText('Last synced: 01/01/2021, 12:00:00 am'),
      ).toBeInTheDocument();
    });

    it('handles null last synced at', () => {
      const list = { ...LIST_ITEM, last_synced_at: null };
      render(<ListItem list={list} />);
      expect(screen.getByText('Last synced: Never')).toBeInTheDocument();
    });

    it('has an edit button', () => {
      render(<ListItem list={LIST_ITEM} />);
      expect(screen.getByText('Edit')).toHaveAttribute(
        'href',
        `/${LIST_ITEM.id}`,
      );
    });
  });

  describe('accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(<ListItem list={LIST_ITEM} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
