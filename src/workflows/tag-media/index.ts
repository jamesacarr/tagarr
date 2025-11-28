import type { Grouped, Item } from '@/workflows/types';

import { addTagToMedia } from './steps/add-tag-to-media';
import { fetchLists } from './steps/fetch-lists';
import { fetchMedia } from './steps/fetch-media';
import { groupMedia } from './steps/group-media';
import { removeTagFromMedia } from './steps/remove-tag-from-media';
import { validateConfig } from './steps/validate-config';

export const tagMedia = async (
  service: 'radarr' | 'sonarr',
): Promise<Grouped<Item>[]> => {
  'use workflow';

  const { apiKey, url } = await validateConfig(service);
  if (!url || !apiKey) {
    return [];
  }

  const [lists, media] = await Promise.all([
    fetchLists(service, url, apiKey),
    fetchMedia(service, url, apiKey),
  ]);

  if (lists.length === 0) {
    return [];
  }

  const groupedMedia = await groupMedia(media, lists);

  for (const { added, removed, tag } of groupedMedia) {
    if (added.count > 0) {
      await addTagToMedia(service, url, apiKey, tag.id, added.items);
    }

    if (removed.count > 0) {
      await removeTagFromMedia(service, url, apiKey, tag.id, removed.items);
    }
  }

  return groupedMedia;
};
