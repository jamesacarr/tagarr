import { connection } from 'next/server';
import type { FC } from 'react';

import { Lists } from '@/components/lists';
import { fetchAllLists } from '@/lib/fetch-all-lists';

const IndexPage: FC = async () => {
  await connection(); // Ensure this page is not cached
  const lists = await fetchAllLists();

  return <Lists lists={lists} />;
};

export default IndexPage;
