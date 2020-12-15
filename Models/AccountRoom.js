const Sequelize = require("sequelize");
const db = require("../config/db");
const Account = require("./Account");
const Room = require("./Room");

const AccountRoom = db.define("AccountRoom", {});

// AccountRoom.belongsTo(Account);
// AccountRoom.belongsTo(Room);

module.exports = AccountRoom;
