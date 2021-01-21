const Sequelize = require("sequelize");
const db = require("../config/db");

const Room = db.define(
  "room",
  {
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
  },
  {
    underscored: true,
  }
);

Room.associate = (models) => {
  Room.belongsToMany(models.Account, {
    through: {
      model: models.AccountRoom,
    },
    foreignKey: "room_id",
  });

  // Room.hasMany(AccountRoom);
  // AccountRoom.belongsTo(Room);
};

module.exports = Room;
