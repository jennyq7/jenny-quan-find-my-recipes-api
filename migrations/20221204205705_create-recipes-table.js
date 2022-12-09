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
    table.string('directions').notNullable();
    table.string('recipe_image').notNullable();
    table.string('cooking_time_min').notNullable();
    table.string('ingredients').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('recipe');
}; 


