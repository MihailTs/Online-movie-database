import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', table => (
        table.increments('id').primary(),
        table.string('name').notNullable(),
        table.string('email').unique().notNullable(),
        table.text('password').notNullable(),
        table.date('created_at').notNullable().defaultTo(knex.fn.now()),
        table.date('updated_at').notNullable().defaultTo(knex.fn.now())
    ));
    await knex.schema.createTable('movies', (table) => {
        table.increments('id');
        table.integer('user_id').notNullable().references('id').inTable('users');
        table.string('name', 255).notNullable().unique();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
    await knex.schema.createTable('genres', (table) => {
        table.increments('id');
        table.string('name', 255).unique().notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
    await knex.schema.createTable('movie_genres', (table) => {
        table.increments('id');
        table.integer('movie_id').notNullable().references('id').inTable('movies');
        table.integer('genre_id').notNullable().references('id').inTable('genres');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
    await knex.schema.createTable('comments', (table) => {
        table.increments('id');
        table.text('text').notNullable();
        table.integer('movie_id').notNullable().references('id').inTable('movies');
        table.integer('user_id').notNullable().references('id').inTable('users');
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
    await knex.schema.dropTable('movies');
    await knex.schema.dropTable('genres');
    await knex.schema.dropTable('movie_genres');
    await knex.schema.dropTable('comments');
}

