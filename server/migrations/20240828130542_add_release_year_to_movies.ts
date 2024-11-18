import type { Knex } from "knex";

exports.up = function(knex: Knex) {
  return knex.schema.table('movies', function(table) {
    table.integer('release_year').nullable();
  });
};
  
exports.down = function(knex: Knex) {
  return knex.schema.table('movies', function(table) {
    table.dropColumn('release_year');
  });
};
