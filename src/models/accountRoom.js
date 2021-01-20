const Sequelize = require("sequelize");
const db = require("../config/db");

const AccountRoom = db.define("account_room", {});

module.exports = AccountRoom;
