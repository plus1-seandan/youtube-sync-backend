const express = require("express");
const bodyParser = require("body-parser");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const db = require("./config/db");
const models = require("./models");
const router = require("./routes");

const main = async () => {
  const PORT = process.env.PORT || 5000;

  await db.sync({
    models,
    alter: true,
    force: true,
  });

  //add middleware
  const app = express();
  app.use(cors()); // Use this after the variable declaration
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const server = http.createServer(app);
  //establish socket io connection
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    socket.on("join-room", (data) => {
      socket.join(data.roomId);
      socket.broadcast.to(data.roomId).emit("user-joined", data.currUser);
    });

    socket.on("send-message", (payload) => {
      socket.broadcast.to(payload.roomId).emit("receive-message", {
        sender: payload.sender,
        message: payload.message,
      });
    });

    socket.on("load-video", (payload) => {
      socket.broadcast.to(payload.roomId).emit("change-video", payload);
    });

    socket.on("user-disconnect", (payload) => {
      socket.broadcast.to(payload.roomId).emit("user-left", {
        sender: payload.sender,
        message: `${payload.leaver.firstName} left the chat`,
      });
    });

    socket.on("video-play", (payload) => {
      socket.broadcast.to(payload.roomId).emit("video-play");
    });
    socket.on("video-pause", (payload) => {
      socket.broadcast.to(payload.roomId).emit("video-pause");
    });

    socket.on("seek-video", (payload) => {
      socket.broadcast.to(payload.roomId).emit("seek-video", payload.seek);
    });
  });

  app.use(router);
  app.listen(5001, () => console.log("server has started on port: " + 5001));
  server.listen(PORT, () => console.log("server has started on port: " + PORT));
};

try {
  main();
} catch (e) {
  console.log(e);
}
