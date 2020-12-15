const Sequelize = require("sequelize");
const db = require("../config/db");
const AccountRoom = require("./AccountRoom");
const Friend = require("./Friend");
const Room = require("./Room");

const Account = db.define("Account", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Account.hasMany(AccountRoom);
// Account.hasMany(Friend);

Account.hasMany(Friend, {
  foreignKey: "RequestorId",
});
Account.hasMany(Friend, {
  foreignKey: "RequesteeId",
});

Account.belongsToMany(Account, {
  through: Friend,
  foreignKey: "RequestorId",
  // otherKey: "RequsteeId",
  as: "Requestor",
});

Account.belongsToMany(Account, {
  through: Friend,
  foreignKey: "RequesteeId",
  // otherKey: "RequestorId",
  as: "Requestee",
});

module.exports = Account;
