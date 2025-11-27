import type { FC } from 'react';

import { Sidebar } from '@/components/ui/sidebar';

import { AppSidebarContent } from './app-sidebar-content';
import { AppSidebarFooter } from './app-sidebar-footer';
import { AppSidebarHeader } from './app-sidebar-header';

export const AppSidebar: FC = () => (
  <Sidebar variant="inset">
    <AppSidebarHeader />
    <AppSidebarContent />
    <AppSidebarFooter />
  </Sidebar>
);
