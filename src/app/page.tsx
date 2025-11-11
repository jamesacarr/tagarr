import { connection } from 'next/server';
import type { FC } from 'react';

import { Lists } from '@/components/lists';
import { getAllLists } from '@/db/list/queries';

const IndexPage: FC = async () => {
  await connection(); // Ensure this page is not cached
  const lists = await getAllLists();

  return <Lists lists={lists} />;
};

export default IndexPage;
