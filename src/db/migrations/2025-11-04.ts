// biome-ignore-all lint/suspicious/noExplicitAny: database type is not known until after migrations
import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('config')
    .addColumn('id', 'integer', col => col.primaryKey())
    .addColumn('radarr_api_key', 'text', col => col.defaultTo('').notNull())
    .addColumn('radarr_url', 'text', col => col.defaultTo('').notNull())
    .addColumn('sonarr_api_key', 'text', col => col.defaultTo('').notNull())
    .addColumn('sonarr_url', 'text', col => col.defaultTo('').notNull())
    .addColumn('mdblist_api_key', 'text', col => col.defaultTo('').notNull())
    .execute();

  await db
    .insertInto('config')
    .values({
      radarr_api_key: '',
      radarr_url: '',
      sonarr_api_key: '',
      sonarr_url: '',
    })
    .execute();

  await db.schema
    .createTable('tag')
    .addColumn('id', 'integer', col => col.primaryKey())
    .addColumn('label', 'text', col => col.notNull())
    .execute();

  await db.schema
    .createTable('list')
    .addColumn('id', 'integer', col => col.primaryKey())
    .addColumn('name', 'text', col => col.notNull())
    .addColumn('description', 'text', col => col.defaultTo('').notNull())
    .addColumn('slug', 'text', col => col.notNull())
    .addColumn('url', 'text', col => col.notNull())
    .addColumn('tag_id', 'integer', col =>
      col.references('tag.id').onDelete('set null'),
    )
    .addColumn('sync', 'integer', col => col.defaultTo(0).notNull())
    .addColumn('last_synced_at', 'text')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('list').execute();
  await db.schema.dropTable('tag').execute();
  await db.schema.dropTable('config').execute();
}
