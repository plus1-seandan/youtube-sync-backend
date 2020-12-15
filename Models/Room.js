const Sequelize = require("sequelize");
const db = require("../config/db");
const Account = require("./Account");
const AccountRoom = require("./AccountRoom");

const Room = db.define("Room", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  private: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      customValidator(value) {
        if (value === null && private) {
          throw new Error("Private Rooms require a password");
        }
      },
    },
  },
});

Room.hasMany(AccountRoom);
AccountRoom.belongsTo(Room);

module.exports = Room;
