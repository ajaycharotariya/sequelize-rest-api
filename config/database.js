// require('dotenv').config();
// const sequelize = new Sequelize(
//   process.env.MYSQL_DATABASE,
//   process.env.MYSQL_USERNAME,
//   process.env.MYSQL_PASSWORD,
//   {
//     host: process.env.MYSQL_HOST,
//     dialect: 'mysql',
//     logging: true,  //sequelize query logging to console
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   },
// );


// // Connect all the models/tables in the database to a db object, 
// // so everything is accessible via one object
// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// (async () => {
//   await sequelize.sync();
// })();

// module.exports = db;
