const Sequelize = require("sequelize");
const db = require("../config/db");

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
    underscored: true,
  }
);

Account.associate = (models) => {
  Account.belongsToMany(models.Room, {
    through: {
      model: models.AccountRoom,
    },
    foreignKey: "account_id",
  });
  Account.belongsToMany(models.Account, {
    through: models.Friend,
    foreignKey: "accountId",
    as: "accountId",
  });

  Account.belongsToMany(models.Account, {
    through: models.Friend,
    foreignKey: "friendId",
    as: "friend(d",
  });
};

module.exports = Account;
