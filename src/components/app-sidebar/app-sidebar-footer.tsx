import { SettingsIcon } from 'lucide-react';
import type { FC } from 'react';

import {
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';

import { AppSidebarItems } from './app-sidebar-items';
import type { MenuItem } from './types';

const APP_VERSION = process.env.NEXT_PUBLIC_VERSION ?? 'unknown';

const ITEMS: MenuItem[] = [
  {
    href: '/settings',
    icon: SettingsIcon,
    title: 'Settings',
  },
];

export const AppSidebarFooter: FC = () => (
  <SidebarFooter data-testid="sidebar-footer">
    <SidebarGroup>
      <SidebarGroupContent>
        <AppSidebarItems items={ITEMS} />
      </SidebarGroupContent>
    </SidebarGroup>
    <SidebarGroupLabel>Version: {APP_VERSION}</SidebarGroupLabel>
  </SidebarFooter>
);
