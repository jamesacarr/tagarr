// biome-ignore-all lint/suspicious/noExplicitAny: database type is not known until after migrations
import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('config').dropColumn('mdblist_api_key').execute();

  await db.schema.alterTable('list').dropColumn('description').execute();
  await db.schema.alterTable('list').dropColumn('slug').execute();
  await db.schema.alterTable('list').dropColumn('tag_id').execute();
  await db.schema.alterTable('list').dropColumn('sync').execute();
  await db.schema
    .alterTable('list')
    .addColumn('enabled', 'integer', col => col.defaultTo(0).notNull())
    .execute();

  await db.schema
    .createTable('lists_tags')
    .addColumn('list_id', 'integer', col =>
      col.notNull().references('list.id').onDelete('cascade'),
    )
    .addColumn('tag_id', 'integer', col =>
      col.notNull().references('tag.id').onDelete('cascade'),
    )
    .execute();

  await db.schema
    .createIndex('lists_tags_list_id_tag_id_unique')
    .on('lists_tags')
    .columns(['list_id', 'tag_id'])
    .unique()
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('lists_tags').execute();

  await db.schema.alterTable('list').dropColumn('enabled').execute();
  await db.schema
    .alterTable('list')
    .addColumn('description', 'text', col => col.defaultTo('').notNull())
    .execute();
  await db.schema
    .alterTable('list')
    .addColumn('slug', 'text', col => col.defaultTo('').notNull())
    .execute();
  await db.schema
    .alterTable('list')
    .addColumn('tag_id', 'integer', col =>
      col.references('tag.id').onDelete('set null'),
    )
    .execute();
  await db.schema
    .alterTable('list')
    .addColumn('sync', 'integer', col => col.defaultTo(0).notNull())
    .execute();

  await db.schema
    .alterTable('config')
    .addColumn('mdblist_api_key', 'text', col => col.defaultTo('').notNull())
    .execute();
}
