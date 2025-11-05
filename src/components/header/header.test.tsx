import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { Header } from './header';

describe('Header', () => {
  beforeEach(() => {
    vi.stubEnv('TZ', 'UTC');
  });

  describe('appearance', () => {
    it('has a home button', () => {
      render(<Header />);
      expect(screen.getByLabelText('Home')).toHaveAttribute('href', `/`);
    });

    it('has a settings button', () => {
      render(<Header />);
      expect(screen.getByLabelText('Settings')).toHaveAttribute(
        'href',
        `/settings`,
      );
    });

    it('has the title', () => {
      render(<Header />);
      expect(screen.getByText('Tagarr')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(<Header />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
