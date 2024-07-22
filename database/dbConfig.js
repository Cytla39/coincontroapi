// module.exports = {
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'coincontrolbd',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//   };

  module.exports = {
    host: process.env.AZURE_MYSQL_HOST,
    user: process.env.AZURE_MYSQL_USER,
    password: process.env.AZURE_MYSQL_PASSWORD,
    database: process.env.AZURE_MYSQL_DATABASE,
    port: Number(process.env.AZURE_MYSQL_PORT)
    // ,
    // ssl: process.env.AZURE_MYSQL_SSL
  };