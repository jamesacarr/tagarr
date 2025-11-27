import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebarContent } from './app-sidebar-content';

describe('AppSidebarContent', () => {
  describe('appearance', () => {
    it('renders Import Lists link', () => {
      render(<AppSidebarContent />, { wrapper: SidebarProvider });

      const importLists = screen.getByTestId('sidebar-item-Import Lists');
      expect(importLists).toBeInTheDocument();
      expect(importLists).toHaveAttribute('href', '/');
    });

    it('only has one item', () => {
      render(<AppSidebarContent />, { wrapper: SidebarProvider });

      const items = screen.getAllByTestId('sidebar-item-', { exact: false });
      expect(items).toHaveLength(1);
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(<AppSidebarContent />, {
        wrapper: SidebarProvider,
      });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
