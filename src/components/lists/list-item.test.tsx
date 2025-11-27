import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { ListItem } from './list-item';
import type { List } from './types';

const LIST: List = {
  id: 1,
  name: 'Test List',
  service: 'radarr',
  tags: [{ id: 1, label: 'test-tag' }],
  url: 'https://test.com',
};

describe('ListItem', () => {
  describe('appearance', () => {
    it('displays the list name', () => {
      render(<ListItem list={LIST} />);
      expect(screen.getByText('Test List')).toBeInTheDocument();
    });

    it('displays the list tag', () => {
      render(<ListItem list={LIST} />);
      expect(screen.getByText('test-tag')).toBeInTheDocument();
    });

    it('adds link to the list', () => {
      render(<ListItem list={LIST} />);
      expect(screen.getByRole('link', { name: 'Test List' })).toHaveAttribute(
        'href',
        'https://test.com',
      );
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<ListItem list={LIST} />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
