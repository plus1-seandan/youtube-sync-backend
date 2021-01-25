const express = require("express");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const passport = require("passport");

const db = require("./config/db");
const models = require("./models");
const router = require("./routes");
const setupPassport = require("./config/passport");
const { getAccountById } = require("./util/account");
const socketActions = require("./config/socket");

const main = async () => {
  const PORT = process.env.PORT || 5000;

  await db.sync({
    models,
    alter: true,
    // force: true,
  });

  //add middleware
  const app = express();
  app.use(cors()); // Use this after the variable declaration
  app.use(passport.initialize());

  setupPassport(passport);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const server = http.createServer(app);
  //establish socket io connection
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", socketActions);
  app.use(router);
  app.listen(5001, () => console.log("server has started on port: " + 5001));
  server.listen(PORT, () => console.log("server has started on port: " + PORT));
};

try {
  main();
} catch (e) {
  console.log(e);
}
