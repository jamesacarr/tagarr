import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { ListsGroup } from './lists-group';
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
    service: 'radarr',
    tags: [{ id: 2, label: 'test-tag-2' }],
    url: 'https://test.com/2',
  },
];

describe('Lists', () => {
  describe('appearance', () => {
    it('displays the group title', () => {
      render(<ListsGroup lists={LISTS} service="radarr" />);
      expect(screen.getByText('Radarr Lists')).toBeInTheDocument();
    });

    it('displays the lists', () => {
      render(<ListsGroup lists={LISTS} service="radarr" />);
      expect(screen.getByText('Test List 1')).toBeInTheDocument();
      expect(screen.getByText('Test List 2')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(
        <ListsGroup lists={LISTS} service="radarr" />,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
