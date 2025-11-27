import { ListIcon } from 'lucide-react';
import type { FC } from 'react';

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar';

import { AppSidebarItems } from './app-sidebar-items';
import type { MenuItem } from './types';

const ITEMS: MenuItem[] = [
  {
    href: '/',
    icon: ListIcon,
    title: 'Import Lists',
  },
];

export const AppSidebarContent: FC = () => (
  <SidebarContent data-testid="sidebar-content">
    <SidebarGroup>
      <SidebarGroupContent>
        <AppSidebarItems items={ITEMS} />
      </SidebarGroupContent>
    </SidebarGroup>
  </SidebarContent>
);
