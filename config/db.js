const { Sequelize } = require("sequelize");

module.exports = new Sequelize("YoutubeSync", "postgres", "shjsds04", {
  host: "localhost",
  dialect: "postgres",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});






// const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "postgres",
//   password: "shjsds04",
//   host: "localhost",
//   port: 5432,
//   database: "YoutubeSync",
// });

// module.exports = pool;
