const Sequelize = require("sequelize");
const db = require("../config/db");

const Friend = db.define(
  "friend",
  {
    status: {
      type: Sequelize.STRING,
      defaultValue: "pending",
    },
  },
  {
    underscored: true,
  }
);

module.exports = Friend;
