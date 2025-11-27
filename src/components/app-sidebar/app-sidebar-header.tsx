import { TagsIcon } from 'lucide-react';
import type { FC } from 'react';

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export const AppSidebarHeader: FC = () => (
  <SidebarHeader data-testid="sidebar-header">
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2">
        <TagsIcon size={20} />
        <span className="text-base font-semibold">Tagarr</span>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
);
