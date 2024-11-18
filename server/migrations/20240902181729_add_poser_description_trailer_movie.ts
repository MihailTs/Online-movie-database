import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('movies', function(table) {
      table.text('description').nullable();
      table.string('poster_url').nullable();
      table.string('trailer_url').nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('movies', function(table) {
      table.dropColumn('description');
      table.dropColumn('poster_url');
      table.dropColumn('trailer_url');
    });
}

