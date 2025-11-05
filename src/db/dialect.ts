import path from 'node:path';

import SQLite from 'better-sqlite3';
import { CompiledQuery, SqliteDialect } from 'kysely';

const DATA_FOLDER = process.env.DATA_FOLDER ?? process.cwd();
const DATABASE_FILE = path.join(DATA_FOLDER, 'sqlite.db');

export const dialect = new SqliteDialect({
  database: new SQLite(DATABASE_FILE),

  onCreateConnection: async connnection => {
    await connnection.executeQuery(
      CompiledQuery.raw(`PRAGMA journal_mode = WAL;`),
    );
    await connnection.executeQuery(
      CompiledQuery.raw(`PRAGMA foreign_keys = ON;`),
    );
  },
});
