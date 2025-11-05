import type { FC } from 'react';

import { Separator } from '@/components/ui/separator';

import { HomeButton } from './home-button';
import { SettingsButton } from './settings-button';

export const Header: FC = () => (
  <header className="bg-background sticky top-0 z-50 w-full items-center border-b">
    <div className="flex h-(--header-height) items-center gap-2 px-4">
      <HomeButton />
      <Separator orientation="vertical" />
      <h1>Tagarr</h1>
      <div className="w-full sm:ml-auto sm:w-auto">
        <SettingsButton />
      </div>
    </div>
  </header>
);
