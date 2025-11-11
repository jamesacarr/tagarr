import type { NewListWithTags } from '@/db/list/types';
import { getLists } from '@/services/radarr';

interface List {
  enabled: number;
  id: number;
  name: string;
  tag_ids: number[];
  url: string | undefined;
}

const isNewList = (list: List): list is NewListWithTags =>
  list.url !== undefined;

export const fetchLists = async () => {
  'use step';

  const lists = await getLists();

  return lists
    .map(list => {
      const url = list.fields.find(field => field.name === 'url')?.value;

      return {
        enabled: list.enabled ? 1 : 0,
        id: list.id,
        name: list.name,
        tag_ids: list.tags,
        url,
      };
    })
    .filter(list => isNewList(list));
};
