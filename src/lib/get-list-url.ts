import type { ListResponse as RadarrListResponse } from '@/services/radarr';
import type { ListResponse as SonarrListResponse } from '@/services/sonarr';

export const getListUrl = (list: RadarrListResponse | SonarrListResponse) => {
  const urlField = list.fields.find(field => field.name === 'url');
  if (urlField) {
    return urlField.value;
  }

  const baseUrlField = list.fields.find(field => field.name === 'baseUrl');
  if (baseUrlField) {
    return baseUrlField.value;
  }

  return '';
};
