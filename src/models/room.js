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
  },
  {
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["password"] },
    },
  }
);

Room.associate = (models) => {
  Room.belongsToMany(models.Account, {
    through: {
      model: models.AccountRoom,
    },
    foreignKey: "roomId",
  });

  // Room.hasMany(AccountRoom);
  // AccountRoom.belongsTo(Room);
};

module.exports = Room;
