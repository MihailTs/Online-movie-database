import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('movies', function(table) {
        table.decimal('average_rating');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('movies', function(table) {
        table.dropColumn('average_rating');
    });
}

