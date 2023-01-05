// Update with your config settings.
//set up knex file to connect to mysql database
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    charset: 'utf8',
    database: "recipes",
    user: "root",
    password: "rootroot"
   }
};
