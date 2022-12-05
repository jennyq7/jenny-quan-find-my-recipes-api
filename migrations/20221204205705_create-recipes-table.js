/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('recipe', (table) => {
    table.integer('idMeal').primary();
    table.string('strMeal').notNullable();
    table.string('strCategory').notNullable();
    table.string('strArea').notNullable();
    table.string('strInstuctions').notNullable();
    table.string('strMealThumb').notNullable();
    table.string('strIngredient1')
    table.string('strIngredient2')
    table.string('strIngredient3')
    table.string('strIngredient4')
    table.string('strIngredient5')
    table.string('strIngredient6')
    table.string('strIngredient7')
    table.string('strIngredient8')
    table.string('strIngredient9')
    table.string('strIngredient10')
    table.string('strIngredient11')
    table.string('strIngredient12')
    table.string('strIngredient13')
    table.string('strIngredient14')
    table.string('strIngredient15')
    table.string('strIngredient16')
    table.string('strIngredient17')
    table.string('strIngredient18')
    table.string('strIngredient19')
    table.string('strIngredient20')
    table.string('strMeasure1')
    table.string('strMeasure2')
    table.string('strMeasure3')
    table.string('strMeasure4')
    table.string('strMeasure5')
    table.string('strMeasure6')
    table.string('strMeasure7')
    table.string('strMeasure8')
    table.string('strMeasure9')
    table.string('strMeasure10')
    table.string('strMeasure11')
    table.string('strMeasure12')
    table.string('strMeasure13')
    table.string('strMeasure14')
    table.string('strMeasure15')
    table.string('strMeasure16')
    table.string('strMeasure17')
    table.string('strMeasure18')
    table.string('strMeasure19')
    table.string('strMeasure20')
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('recipe');
}; 
