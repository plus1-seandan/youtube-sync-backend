const Sequelize = require("sequelize");
const db = require("../config/db");
const Account = require("./account");

const Friend = db.define("friend", {});

module.exports = Friend;
