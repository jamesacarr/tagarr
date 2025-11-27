import Link from 'next/link';
import type { FC } from 'react';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import type { MenuItem } from './types';

interface Props {
  items: MenuItem[];
}

export const AppSidebarItems: FC<Props> = ({ items }) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <SidebarMenu>
      {items.map(item => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link data-testid={`sidebar-item-${item.title}`} href={item.href}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
