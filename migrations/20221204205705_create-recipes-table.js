/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('recipe', (table) => {
    table.uuid('recipe_id').primary();
    table.string('recipe_name');
    table.string('recipe_types');
    table.string('recipe_description');
    table.string('directions');
    table.string('recipe_image');
    table.string('cooking_time_min');
    table.string('ingredients');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('recipe');
}; 


