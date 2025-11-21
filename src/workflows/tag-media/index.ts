import type { Grouped, Item } from '@/workflows/types';

import { addTagToMedia } from './steps/add-tag-to-media';
import { fetchLists } from './steps/fetch-lists';
import { fetchMedia } from './steps/fetch-media';
import { fetchTags } from './steps/fetch-tags';
import { groupMedia } from './steps/group-media';
import { removeTagFromMedia } from './steps/remove-tag-from-media';
import { validateConfig } from './steps/validate-config';

export const tagMedia = async (
  service: 'radarr' | 'sonarr',
): Promise<Grouped<Item>[]> => {
  'use workflow';

  const { apiKey, url } = await validateConfig(service);

  const [lists, media, tags] = await Promise.all([
    fetchLists(service, url, apiKey),
    fetchMedia(service, url, apiKey),
    fetchTags(service, url, apiKey),
  ]);
  const groupedMedia = await groupMedia(media, lists, tags);

  for (const { added, removed, tag } of groupedMedia) {
    await addTagToMedia(service, url, apiKey, tag.id, added.items);
    await removeTagFromMedia(service, url, apiKey, tag.id, removed.items);
  }

  return groupedMedia;
};
