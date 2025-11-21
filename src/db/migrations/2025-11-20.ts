// biome-ignore-all lint/suspicious/noExplicitAny: database type is not known until after migrations
import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('lists_tags').execute();
  await db.schema.dropTable('list').execute();
  await db.schema.dropTable('tag').execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('tag')
    .addColumn('id', 'integer', col => col.primaryKey())
    .addColumn('label', 'text', col => col.notNull())
    .execute();

  await db.schema
    .createTable('list')
    .addColumn('id', 'integer', col => col.primaryKey())
    .addColumn('name', 'text', col => col.notNull())
    .addColumn('url', 'text', col => col.notNull())
    .addColumn('enabled', 'integer', col => col.defaultTo(0).notNull())
    .addColumn('last_synced_at', 'text')
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
