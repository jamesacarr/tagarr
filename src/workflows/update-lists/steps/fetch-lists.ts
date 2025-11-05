import { getLists } from '@/services/mdblist';

export const fetchLists = async () => {
  'use step';

  const lists = await getLists();
  return lists.map(list => ({
    description: list.description,
    id: list.id,
    name: list.name,
    slug: list.slug,
    url: `https://mdblist.com/lists/${list.user_name}/${list.slug}`,
  }));
};
