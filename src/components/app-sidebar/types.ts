import type { LucideIcon } from 'lucide-react';
import type Link from 'next/link';
import type { ComponentProps } from 'react';

export interface MenuItem {
  href: ComponentProps<typeof Link>['href'];
  icon: LucideIcon;
  title: string;
}
