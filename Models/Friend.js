const Sequelize = require("sequelize");
const db = require("../config/db");
const Account = require("./Account");

const Friend = db.define("Friend", {});

module.exports = Friend;
