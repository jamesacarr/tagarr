import { connection } from 'next/server';
import type { FC } from 'react';

import { SettingsForm } from '@/components/settings-form';
import { getConfig } from '@/db/config/queries';

const SettingsPage: FC = async () => {
  await connection(); // Ensure this page is not cached
  const config = await getConfig();
  return <SettingsForm settings={config} />;
};

export default SettingsPage;
