const { Sequelize } = require("sequelize");

module.exports = new Sequelize("YoutubeSync", "postgres", "postgres", {
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
});
