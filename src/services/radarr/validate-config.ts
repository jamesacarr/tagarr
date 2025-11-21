import { getConfig } from '@/db/config/queries';

import { getStatus } from './get-status';
import { ping } from './ping';

interface MissingURLResult {
  success: false;
  url: null;
  apiKey: null;
  error: 'missing-url';
}

interface MissingAPIKeyResult {
  success: false;
  url: string;
  apiKey: null;
  error: 'missing-api-key';
}

interface PingFailedResult {
  success: false;
  url: null;
  apiKey: null;
  error: 'ping-failed';
}

interface StatusFailedResult {
  success: false;
  url: string;
  apiKey: null;
  error: 'status-failed';
}

interface ValidResult {
  success: true;
  url: string;
  apiKey: string;
}

type Result =
  | MissingURLResult
  | MissingAPIKeyResult
  | PingFailedResult
  | StatusFailedResult
  | ValidResult;

export const validateConfig = async (): Promise<Result> => {
  const { radarr_api_key, radarr_url } = await getConfig();

  if (!radarr_url) {
    return {
      apiKey: null,
      error: 'missing-url',
      success: false,
      url: null,
    };
  }

  const pingResult = await ping(radarr_url);
  if (!pingResult) {
    return {
      apiKey: null,
      error: 'ping-failed',
      success: false,
      url: null,
    };
  }

  if (!radarr_api_key) {
    return {
      apiKey: null,
      error: 'missing-api-key',
      success: false,
      url: radarr_url,
    };
  }

  const statusResult = await getStatus(radarr_url, radarr_api_key);
  if (!statusResult) {
    return {
      apiKey: null,
      error: 'status-failed',
      success: false,
      url: radarr_url,
    };
  }

  return {
    apiKey: radarr_api_key,
    success: true,
    url: radarr_url,
  };
};
