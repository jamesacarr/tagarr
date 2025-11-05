import { FatalError } from 'workflow';

import { getConfig } from '@/db/config/queries';

export const validateConfig = async () => {
  const { mdblist_api_key } = await getConfig();

  if (!mdblist_api_key) {
    throw new FatalError('MDBList API key is not set');
  }

  return { mdblist_api_key };
};
