// biome-ignore-all lint/suspicious/noConsole: we're using console to log migration results
import { promises as fs } from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { MigrationInfo } from 'kysely';
import { FileMigrationProvider, Migrator } from 'kysely';

import { createLogger } from '@/lib/logger';

import { db } from './db';

const log = createLogger('[Migration]');

const getMigrator = () => {
  const filePath = fileURLToPath(import.meta.url);
  const migrationFolder = path.join(path.dirname(filePath), 'migrations');
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({ fs, migrationFolder, path }),
  });

  return migrator;
};

const shouldRunMigrations = (migrations: readonly MigrationInfo[]) =>
  migrations.length > 0 &&
  migrations.some(migration => migration.executedAt === undefined);

export const migrateToLatest = async () => {
  log.info('Migrations starting');

  const migrator = getMigrator();
  const migrations = await migrator.getMigrations();
  if (!shouldRunMigrations(migrations)) {
    log.info('No pending migrations');

    return;
  }

  const { error, results } = await migrator.migrateToLatest();

  for (const result of results ?? []) {
    switch (result.status) {
      case 'Success':
        log.info(
          { migrationName: result.migrationName },
          'Migration succeeded',
        );
        break;
      case 'Error':
        log.error({ migrationName: result.migrationName }, 'Migration failed');
        break;
    }
  }

  if (error) {
    log.fatal({ error }, 'Migrations failed');
    process.exit(1);
  }

  log.info('Migrations finished');
};
