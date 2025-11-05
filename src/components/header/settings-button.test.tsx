import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { SettingsButton } from './settings-button';

describe('SettingsButton', () => {
  beforeEach(() => {
    vi.stubEnv('TZ', 'UTC');
  });

  describe('appearance', () => {
    it('has a settings button', () => {
      render(<SettingsButton />);
      expect(screen.getByLabelText('Settings')).toHaveAttribute(
        'href',
        `/settings`,
      );
    });
  });

  describe('accessibility', () => {
    it('should have no violations', async () => {
      const { container } = render(<SettingsButton />);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
