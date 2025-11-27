import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';

import { updateSettings } from './actions';
import { SettingsForm } from './settings-form';

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockError = vi.mocked(toast.error);
const mockSuccess = vi.mocked(toast.success);
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

const mockUpdateSettings = vi.mocked(updateSettings);
vi.mock('./actions', () => ({
  updateSettings: vi.fn(),
}));

const DEFAULT_SETTINGS = {
  radarr_api_key: '',
  radarr_url: '',
  sonarr_api_key: '',
  sonarr_url: '',
};

describe('SettingsForm', () => {
  describe('appearance', () => {
    it('displays the title', () => {
      render(<SettingsForm settings={DEFAULT_SETTINGS} />);
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('displays the description', () => {
      render(<SettingsForm settings={DEFAULT_SETTINGS} />);
      expect(
        screen.getByText('Configure your *arr app connection settings.'),
      ).toBeInTheDocument();
    });

    it('displays the form fields', () => {
      render(<SettingsForm settings={DEFAULT_SETTINGS} />);
      expect(screen.getByLabelText('Radarr API Key')).toBeInTheDocument();
      expect(screen.getByLabelText('Radarr URL')).toBeInTheDocument();
      expect(screen.getByLabelText('Sonarr API Key')).toBeInTheDocument();
      expect(screen.getByLabelText('Sonarr URL')).toBeInTheDocument();
    });

    it('displays empty form fields when no settings are provided', () => {
      render(<SettingsForm settings={DEFAULT_SETTINGS} />);
      expect(screen.getByLabelText('Radarr API Key')).toHaveValue('');
      expect(screen.getByLabelText('Radarr URL')).toHaveValue('');
      expect(screen.getByLabelText('Sonarr API Key')).toHaveValue('');
      expect(screen.getByLabelText('Sonarr URL')).toHaveValue('');
    });

    it('displays the form fields when settings are provided', () => {
      const settings = {
        radarr_api_key: 'radarr_key',
        radarr_url: 'https://radarr.com',
        sonarr_api_key: 'sonarr_key',
        sonarr_url: 'https://sonarr.com',
      };

      render(<SettingsForm settings={settings} />);
      expect(screen.getByLabelText('Radarr API Key')).toHaveValue('radarr_key');
      expect(screen.getByLabelText('Radarr URL')).toHaveValue(
        'https://radarr.com',
      );
      expect(screen.getByLabelText('Sonarr API Key')).toHaveValue('sonarr_key');
      expect(screen.getByLabelText('Sonarr URL')).toHaveValue(
        'https://sonarr.com',
      );
    });
  });

  describe('behavior', () => {
    it('submits the form', async () => {
      render(<SettingsForm settings={DEFAULT_SETTINGS} />);

      await userEvent.type(
        screen.getByLabelText('Radarr API Key'),
        'radarr_key',
      );
      await userEvent.type(
        screen.getByLabelText('Radarr URL'),
        'https://radarr.com',
      );
      await userEvent.type(
        screen.getByLabelText('Sonarr API Key'),
        'sonarr_key',
      );
      await userEvent.type(
        screen.getByLabelText('Sonarr URL'),
        'https://sonarr.com',
      );

      await userEvent.click(screen.getByText('Save'));

      expect(updateSettings).toHaveBeenCalledWith({
        radarr_api_key: 'radarr_key',
        radarr_url: 'https://radarr.com',
        sonarr_api_key: 'sonarr_key',
        sonarr_url: 'https://sonarr.com',
      });
    });

    it('redirects to the home page after saving', async () => {
      render(<SettingsForm settings={DEFAULT_SETTINGS} />);

      await userEvent.click(screen.getByText('Save'));

      expect(mockPush).toHaveBeenCalledWith('/');
    });

    it('displays a success toast after saving', async () => {
      render(<SettingsForm settings={DEFAULT_SETTINGS} />);

      await userEvent.click(screen.getByText('Save'));

      expect(mockSuccess).toHaveBeenCalledWith('Settings updated');
    });

    it('displays an error toast after error when saving', async () => {
      mockUpdateSettings.mockRejectedValue(
        new Error('Failed to update settings'),
      );

      render(<SettingsForm settings={DEFAULT_SETTINGS} />);

      await userEvent.click(screen.getByText('Save'));

      expect(mockError).toHaveBeenCalledWith('Failed to update settings');
    });
  });

  describe('accessibility', () => {
    it('has no violations', async () => {
      const { container } = render(
        <SettingsForm settings={DEFAULT_SETTINGS} />,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
