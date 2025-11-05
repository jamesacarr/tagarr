import { Settings } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';

export const SettingsButton: FC = () => (
  <Button
    aria-label="Settings"
    asChild
    className="h-8 w-8"
    size="icon"
    variant="ghost"
  >
    <Link href="/settings">
      <Settings />
    </Link>
  </Button>
);
