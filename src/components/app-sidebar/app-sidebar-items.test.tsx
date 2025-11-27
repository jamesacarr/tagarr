import { render, screen } from '@testing-library/react';
import { SettingsIcon } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';

import { SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebarItems } from './app-sidebar-items';

const ITEMS = [
  { href: '/test-1', icon: SettingsIcon, title: 'test 1' },
  { href: '/test-2', icon: SettingsIcon, title: 'test 2' },
  { href: '/test-3', icon: SettingsIcon, title: 'test 3' },
];

describe('AppSidebarItems', () => {
  describe('appearance', () => {
    it('renders items', () => {
      // @ts-expect-error - href values aren't valid because they're not actual routes in the app
      render(<AppSidebarItems items={ITEMS} />, { wrapper: SidebarProvider });

      const importLists = screen.getAllByTestId('sidebar-item-', {
        exact: false,
      });
      expect(importLists).toHaveLength(ITEMS.length);

      for (const item of ITEMS) {
        const link = screen.getByTestId(`sidebar-item-${item.title}`);
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', item.href);
      }
    });

    it('renders nothing when no items', () => {
      const { container } = render(<AppSidebarItems items={[]} />);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      // @ts-expect-error - href values aren't valid because they're not actual routes in the app
      const { container } = render(<AppSidebarItems items={ITEMS} />, {
        wrapper: SidebarProvider,
      });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
