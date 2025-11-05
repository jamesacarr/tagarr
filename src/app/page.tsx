import { connection } from 'next/server';
import type { FC } from 'react';

import { Lists } from '@/components/lists';
import { getAllListsWithTags } from '@/db/list/queries';

const IndexPage: FC = async () => {
  await connection(); // Ensure this page is not cached
  const lists = await getAllListsWithTags();

  return <Lists lists={lists} />;
};

export default IndexPage;
