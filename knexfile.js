// Update with your config settings.
//set up knex file to connect to mysql database
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
//db for azure project
module.exports = {
  client: 'mysql',
  connection: {
    host: 'mysqltestdb123.mysql.database.azure.com',
    charset: 'utf8',
    database: "quickstartdb",
    user: "mysqluser1",
    password: "T*6g2xDF%"
   }
};
//
//db for Render deployment
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