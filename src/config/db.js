const { Sequelize } = require("sequelize");

module.exports = new Sequelize("YoutubeSync", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
});
