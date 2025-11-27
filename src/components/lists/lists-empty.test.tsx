import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { ListsEmpty } from './lists-empty';

describe('ListsEmpty', () => {
  describe('appearance', () => {
    it('displays the title', () => {
      render(<ListsEmpty />);
      expect(screen.getByText('No Synced Lists')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<ListsEmpty />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
