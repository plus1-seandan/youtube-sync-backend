const Sequelize = require("sequelize");
const db = require("../config/db");
const AccountRoom = require("./accountRoom");
const Friend = require("./friend");
const Room = require("./room");

const Account = db.define(
  "account",
  {
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
  },
  {
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
  }
);

Account.associate = (models) => {
  Account.belongsToMany(models.Room, {
    through: {
      model: models.AccountRoom,
    },
    foreignKey: "accountId",
  });
  Account.belongsToMany(models.Account, {
    through: Friend,
    foreignKey: "RequestorId",
    as: "Requestor",
  });

  Account.belongsToMany(models.Account, {
    through: Friend,
    foreignKey: "RequesteeId",
    as: "Requestee",
  });
};

module.exports = Account;

