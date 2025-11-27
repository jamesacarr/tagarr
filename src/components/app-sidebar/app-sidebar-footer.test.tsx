import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebarFooter } from './app-sidebar-footer';

describe('AppSidebarFooter', () => {
  describe('appearance', () => {
    it('renders Settings link', () => {
      render(<AppSidebarFooter />, { wrapper: SidebarProvider });

      const settings = screen.getByTestId('sidebar-item-Settings');
      expect(settings).toBeInTheDocument();
      expect(settings).toHaveAttribute('href', '/settings');
    });

    it('renders version', () => {
      render(<AppSidebarFooter />, { wrapper: SidebarProvider });

      const version = screen.getByText('Version:', { exact: false });
      expect(version).toBeInTheDocument();
    });

    it('only has one item', () => {
      render(<AppSidebarFooter />, { wrapper: SidebarProvider });

      const items = screen.getAllByTestId('sidebar-item-', { exact: false });
      expect(items).toHaveLength(1);
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<AppSidebarFooter />, {
        wrapper: SidebarProvider,
      });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
