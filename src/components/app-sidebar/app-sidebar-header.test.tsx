import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebarHeader } from './app-sidebar-header';

describe('AppSidebarHeader', () => {
  describe('appearance', () => {
    it('shows title', () => {
      render(<AppSidebarHeader />, { wrapper: SidebarProvider });

      const title = screen.getByText('Tagarr');
      expect(title).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<AppSidebarHeader />, {
        wrapper: SidebarProvider,
      });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
