// biome-ignore-all lint/suspicious/noConsole: we're using console to log migration results
import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FileMigrationProvider, Migrator } from 'kysely';

import { logger } from '@/lib/logger';

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
        logger.info(
          { migrationName: result.migrationName },
          'Migration executed successfully',
        );
        break;
      case 'Error':
        logger.error(
          { migrationName: result.migrationName },
          'Migration failed to execute',
        );
        break;
    }
  }

  if (error) {
    logger.error({ error }, 'Migration failed to migrate');
    process.exit(1);
  }
};
