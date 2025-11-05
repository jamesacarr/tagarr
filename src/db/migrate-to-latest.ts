// biome-ignore-all lint/suspicious/noConsole: we're using console to log migration results
import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FileMigrationProvider, Migrator } from 'kysely';

import { db } from './db';

export const migrateToLatest = async () => {
  const filePath = fileURLToPath(import.meta.url);
  const migrationFolder = path.join(path.dirname(filePath), 'migrations');
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({ fs, migrationFolder, path }),
  });

  const { error, results } = await migrator.migrateToLatest();

  for (const result of results ?? []) {
    switch (result.status) {
      case 'Success':
        console.log(
          `[Migration] ${result.migrationName}: executed successfully`,
        );
        break;
      case 'Error':
        console.error(`[Migration] ${result.migrationName}: failed to execute`);
        break;
    }
  }

  if (error) {
    console.error('[Migration] failed to migrate');
    console.error(error);
    process.exit(1);
  }
};
