import { Kysely, ParseJSONResultsPlugin } from 'kysely';

import { dialect } from './dialect';
import type { Database } from './types';

export const db = new Kysely<Database>({
  dialect,
  plugins: [new ParseJSONResultsPlugin()],
});
