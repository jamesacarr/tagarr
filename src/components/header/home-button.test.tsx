import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { HomeButton } from './home-button';

describe('HomeButton', () => {
  beforeEach(() => {
    vi.stubEnv('TZ', 'UTC');
  });

  describe('appearance', () => {
    it('has a home button', () => {
      render(<HomeButton />);
      expect(screen.getByLabelText('Home')).toHaveAttribute('href', `/`);
    });
  });

  describe('accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(<HomeButton />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
