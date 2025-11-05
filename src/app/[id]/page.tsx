import { notFound } from 'next/navigation';
import type { FC } from 'react';

import { ListForm } from '@/components/list-form';
import { getListById } from '@/db/list/queries';
import { getAllTags } from '@/db/tag/queries';

const getListForId = async (id: string) => {
  const idNumber = Number.parseInt(id, 10);
  if (Number.isNaN(idNumber)) {
    return notFound();
  }

  const list = await getListById(idNumber);
  if (!list) {
    return notFound();
  }

  return list;
};

interface Props {
  params: Promise<{ id: string }>;
}

const ListPage: FC<Props> = async ({ params }) => {
  const { id } = await params;
  const [list, tags] = await Promise.all([getListForId(id), getAllTags()]);

  return <ListForm list={list} tags={tags} />;
};

export default ListPage;
