const { Sequelize } = require("sequelize");
const Account = require("./account");
const AccountRoom = require("./accountRoom");
const Friend = require("./friend");
const Room = require("./room");

const db = require("../config/db");

const models = {
  Account,
  AccountRoom,
  Friend,
  Room,
};

//if a model has associate attribute, create the associations
Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = db;
models.Sequelize = Sequelize;

module.exports = models;
