import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebar } from './app-sidebar';

describe('AppSidebar', () => {
  describe('appearance', () => {
    it('shows header', () => {
      render(<AppSidebar />, { wrapper: SidebarProvider });

      const header = screen.getByTestId('sidebar-header');
      expect(header).toBeInTheDocument();
    });

    it('shows content', () => {
      render(<AppSidebar />, { wrapper: SidebarProvider });

      const content = screen.getByTestId('sidebar-content');
      expect(content).toBeInTheDocument();
    });

    it('shows footer', () => {
      render(<AppSidebar />, { wrapper: SidebarProvider });

      const footer = screen.getByTestId('sidebar-footer');
      expect(footer).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<AppSidebar />, {
        wrapper: SidebarProvider,
      });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
