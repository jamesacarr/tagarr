import { revalidatePath } from 'next/cache';
import { describe, expect, it, vi } from 'vitest';

import { updateConfig } from '@/db/config/queries';

import { updateSettings } from './actions';

const mockUpdateConfig = vi.mocked(updateConfig);
vi.mock('@/db/config/queries', () => ({
  updateConfig: vi.fn(),
}));

const mockRevalidatePath = vi.mocked(revalidatePath);
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

describe('updateSettings', () => {
  it('calls updateConfig with the correct data', async () => {
    const data = {
      radarr_api_key: 'radarr_key',
      radarr_url: 'https://radarr.com',
      sonarr_api_key: 'sonarr_key',
      sonarr_url: 'https://sonarr.com',
    };

    await updateSettings(data);

    expect(mockUpdateConfig).toHaveBeenCalledWith(data);
  });

  it('calls revalidatePath', async () => {
    const data = {
      radarr_api_key: 'radarr_key',
      radarr_url: 'https://radarr.com',
      sonarr_api_key: 'sonarr_key',
      sonarr_url: 'https://sonarr.com',
    };

    await updateSettings(data);

    expect(mockRevalidatePath).toHaveBeenCalledWith('/settings');
  });

  it('returns success when the data is valid', async () => {
    const data = {
      radarr_api_key: 'radarr_key',
      radarr_url: 'https://radarr.com',
      sonarr_api_key: 'sonarr_key',
      sonarr_url: 'https://sonarr.com',
    };

    const result = await updateSettings(data);

    expect(result).toEqual({
      success: true,
    });
  });

  it('returns errors when the data is invalid', async () => {
    const data = {
      radarr_api_key: 'radarr_key',
      radarr_url: 'invalid_url',
      sonarr_api_key: 'sonarr_key',
      sonarr_url: 'https://sonarr.com',
    };

    const result = await updateSettings(data);

    expect(result).toEqual({
      errors: [
        {
          message: 'Invalid URL',
          path: 'radarr_url',
          type: 'invalid_format',
        },
      ],
      success: false,
    });
  });
});
