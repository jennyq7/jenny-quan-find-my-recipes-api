/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('recipe', (table) => {
    table.uuid('recipe_id').primary();
    table.string('recipe_name').notNullable();
    table.string('recipe_types').notNullable();
    table.string('recipe_description').notNullable();
    table.string('strInstuctions').notNullable();
    table.string('recipe_image').notNullable();
    table.string
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('recipe');
}; 


