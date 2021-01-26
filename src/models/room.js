const Sequelize = require("sequelize");
const db = require("../config/db");

const defaultJSON = {
  kind: "youtube#searchResult",
  etag: "NzfZytmTB9EDUCEP8LSk7x52jJc",
  id: { kind: "youtube#video", videoId: "n27J-8_4AVs" },
  snippet: {
    publishedAt: "2021-01-25T22:03:20Z",
    channelId: "UCpUlpuYthS-LmpAZYoXAXiQ",
    title: "(Guns n’ Roses) Sweet Child O’ Mine piano",
    description: "",
    thumbnails: {
      default: {
        url: "https://i.ytimg.com/vi/n27J-8_4AVs/default.jpg",
        width: 120,
        height: 90,
      },
      medium: {
        url: "https://i.ytimg.com/vi/n27J-8_4AVs/mqdefault.jpg",
        width: 320,
        height: 180,
      },
      high: {
        url: "https://i.ytimg.com/vi/n27J-8_4AVs/hqdefault.jpg",
        width: 480,
        height: 360,
      },
    },
    channelTitle: "Carl9997",
    liveBroadcastContent: "none",
    publishTime: "2021-01-25T22:03:20Z",
  },
};

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
    video: {
      type: Sequelize.JSON,
      defaultValue: defaultJSON,
    },
    playing: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    played: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
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
