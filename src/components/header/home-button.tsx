import { HouseIcon } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';

export const HomeButton: FC = () => (
  <Button
    aria-label="Home"
    asChild
    className="h-8 w-8"
    size="icon"
    variant="ghost"
  >
    <Link href="/">
      <HouseIcon />
    </Link>
  </Button>
);
