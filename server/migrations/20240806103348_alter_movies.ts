import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('movies', function(table) {
        table.string('director');
        table.string('screenwriter');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('your_table', function(table) {
        table.dropColumn('director');
        table.dropColumn('screenwriter');
    });
}

