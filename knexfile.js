// Update with your config settings.
//set up knex file to connect to mysql database
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'mysql',
  connection: {
    host: 'recipe-box-db.mysql.database.azure.com',
    charset: 'utf8',
    database: "recipe-box-db",
    user: "jenny",
    password: "ARqTLhgv6KXF6BA!"
   }
};

// module.exports = {
//   client: 'mysql',
//   connection: {
//     host: 'mysql-kpiq',
//     charset: 'utf8',
//     database: "mysql",
//     user: "mysql",
//     password: "Td0WgfWWHBjdbmMkcWuNgcUiqz2S15bC"
//    }
// };