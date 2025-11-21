import type {
  ListResponse as RadarrListResponse,
  TagResponse as RadarrTagResponse,
} from '@/services/radarr';
import type {
  ListResponse as SonarrListResponse,
  TagResponse as SonarrTagResponse,
} from '@/services/sonarr';

import { getListUrl } from './get-list-url';

export const formatList =
  (
    service: 'radarr' | 'sonarr',
    tags: SonarrTagResponse[] | RadarrTagResponse[],
  ) =>
  (list: RadarrListResponse | SonarrListResponse) => ({
    id: list.id,
    name: list.name,
    service,
    tags: list.tags
      .map(tagId => tags.find(tag => tag.id === tagId))
      .filter(tag => tag !== undefined),
    url: getListUrl(list),
  });
