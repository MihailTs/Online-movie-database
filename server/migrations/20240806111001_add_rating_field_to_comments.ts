import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('comments', function(table) {
        table.decimal('rating', 5, 2).checkBetween([0, 10]);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('comments', function(table) {
        table.dropColumn('rating');
    });
}

