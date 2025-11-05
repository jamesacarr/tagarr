import { useEffect, useState } from 'react';

import { formatLastSynced } from './format-last-synced';

export const useLastSyncedAt = (lastSyncedAt: string | null) => {
  const [output, setOutput] = useState('');

  useEffect(() => {
    setOutput(formatLastSynced(lastSyncedAt));
  }, [lastSyncedAt]);

  return output;
};
