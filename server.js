const Room = require("./Models/Room");
const Account = require("./Models/Account");
const Friend = require("./Models/Friend");
const AccountRoom = require("./Models/AccountRoom");

//Database
const db = require("./config/db");
//Test DB
db.authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => console.log(err.message));
// const pool = require("./config/db");

db.sync();

const express = require("express"),
  app = express(),
  bodyParser = require("body-parser");

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
const socketio = require("socket.io");

const http = require("http");

const server = http.createServer(app);

var cors = require("cors");

app.use(cors()); // Use this after the variable declaration

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const router = require("./Routes");
const { callbackify } = require("util");

const PORT = process.env.PORT || 5000;

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

