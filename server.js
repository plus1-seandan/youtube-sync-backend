const {
  getAccount,
  createAccount,
  getAccountByUsername,
  searchAccounts,
  searchMyFriends,
  addFriend,
  removeFriend,
} = require("./accounts.js");
const {
  createRoom,
  addMember,
  searchRoom,
  searchRoomMembers,
  searchMyRooms,
  searchRoomById,
  removeRoom,
} = require("./rooms.js");

const Room = require("./Models/Room");
const Account = require("./Models/Account");
const Friend = require("./Models/Friend");
const AccountRoom = require("./Models/AccountRoom");

// const AccountRoom = require("./Models/AccountRoom");

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
    // if (users[roomID]) {
    //   const length = users[roomID].length;
    //   if (length === 4) {
    //     socket.emit("room full");
    //     return;
    //   }
    //   users[roomID].push(socket.id);
    // } else {
    //   users[roomID] = [socket.id];
    // }
    // socketToRoom[socket.id] = roomID;
    // const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

    // socket.emit("all users", usersInThisRoom);
  });

  socket.on("send-message", (payload) => {
    console.log("send message received");
    socket.broadcast.to(payload.roomId).emit("receive-message", {
      sender: payload.sender,
      message: payload.message,
    });
  });

  socket.on("load-video", (payload) => {
    console.log(payload);
    socket.broadcast.to(payload.roomId).emit("change-video", payload);
  });

  socket.on("user-disconnect", (payload) => {
    console.log("on disconnect");
    console.log(payload);
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
// end socket io things

app.use(router);
app.listen(5001, () =>
  console.log("server has started on port! hey lets go: " + 5001)
);
server.listen(PORT, () =>
  console.log("server has started on port! hey lets go: " + PORT)
);

// app.listen(5001, () =>
//   console.log("server has started on port! hey lets go: " + 5001)
// );
// server.listen(PORT, () =>
//   console.log("server has started on port! hey lets go: " + PORT)
// );

/*
app.post("/create-account", function (req, res) {
  const acct = createAccount(req.body);
  if (!acct) {
    res.send("ERROR");
  } else {
    res.send("SUCCESS");
  }
});

app.get("/sign-in", function (req, res) {
  const acct = getAccountByUsername(req.query.username);
  if (acct) {
    if (acct.password == req.query.password) {
      console.log("success");
      res.send(acct);
    } else {
      console.log("fail");
      res.send("Incorrect Password");
    }
  } else {
    res.send("Username not found");
  }
});

app.get("/search-users", function (req, res) {
  const accts = searchAccounts(req.query.query, req.query.acctId);
  res.send(accts);
});

app.get("/search-room", function (req, res) {
  const room = searchRoom(req.query.name);
  res.send(room);
});

app.get("/search-roomMembers", function (req, res) {
  members = [];
  const roomMembers = searchRoomMembers(req.query.roomId);
  for (i = 0; i < roomMembers.length; i++) {
    const acct = getAccount(roomMembers[i].userId);
    members.push(acct);
  }
  res.send(members);
});

app.get("/search-myRooms", function (req, res) {
  const myRooms = searchMyRooms(req.query.userId);
  res.send(myRooms);
});

app.get("/search-myFriends", function (req, res) {
  const myFriends = searchMyFriends(req.query.userId);
  res.send(myFriends);
});

app.post("/create-room", function (req, res) {
  console.log("trigger create room");
  createRoom(req.body);
  res.send(req.body);
});

app.post("/add-member", function (req, res) {
  addMember(req.body.userId, req.body.roomId);
  res.send("sucess");
});

app.post("/add-friend", function (req, res) {
  addFriend(req.body.currUserId, req.body.userId);
  res.send("success");
});

app.delete("/delete-friend", function (req, res) {
  // res.send("success");
  // console.log(req);
  removeFriend(req.query);
  res.send("success");
});

app.delete("/delete-room", function (req, res) {
  // res.send("success");
  // console.log(req);
  removeRoom(req.query);
  res.send("success");
});

app.use(router);
server.listen(PORT, () =>
  console.log("server has started on port! hey lets go: " + PORT)
);

//ROUTES
app.post("/accounts", async (req, res) => {
  //await
  try {
    const { firstName } = req.body;
    const newAccount = await pool.query(
      "INSERT INTO accounts (first_name) VALUES($1)",
      [firstName]
    );
    res.json(newAccount);
  } catch (err) {
    console.log(err.message);
  }
});

*/
