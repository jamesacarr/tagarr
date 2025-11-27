import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { Lists } from './lists';
import type { List } from './types';

const LISTS: List[] = [
  {
    id: 1,
    name: 'Test List 1',
    service: 'radarr',
    tags: [{ id: 1, label: 'test-tag-1' }],
    url: 'https://test.com/1',
  },
  {
    id: 2,
    name: 'Test List 2',
    service: 'sonarr',
    tags: [{ id: 2, label: 'test-tag-2' }],
    url: 'https://test.com/2',
  },
];

describe('Lists', () => {
  describe('appearance', () => {
    it('displays the empty state when no lists', () => {
      render(<Lists lists={[]} />);
      expect(screen.getByText('No Synced Lists')).toBeInTheDocument();
    });

    it('displays the list groups', () => {
      render(<Lists lists={LISTS} />);
      expect(screen.getByText('Radarr Lists')).toBeInTheDocument();
      expect(screen.getByText('Sonarr Lists')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<Lists lists={LISTS} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
