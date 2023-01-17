// Update with your config settings.
//set up knex file to connect to mysql database
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'mysql',
  connection: {
    host: 'mysql-kpiq',
    charset: 'utf8',
    database: "mysql",
    user: "mysql",
    password: "Td0WgfWWHBjdbmMkcWuNgcUiqz2S15bC"
   }
};

// module.exports = {
//   client: 'mysql',
//   connection: {
//     host: 'mysql-wjvs',
//     charset: 'utf8',
//     database: "recipes",
//     user: "root",
//     password: "rootroot",
//     port: "3306"
//    }
// };

// module.exports = {
//   client: 'mysql',
//   connection: {
//     host: '127.0.0.1',
//     charset: 'utf8',
//     database: "recipes",
//     user: "root",
//     password: "rootroot",
//    }
// }
