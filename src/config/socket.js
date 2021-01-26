const models = require("../models");
const { getAccountById } = require("../util/account");

async function socketActions(socket) {
  socket.on("join-room", async (data) => {
    socket.join(data.roomId);
    const acct = await getAccountById(data.acctId);
    const _data = {
      roomId: data.roomId,
      sender: { id: "ADMIN", name: "ADMIN" },
      message: `${acct.firstName} joined the chat`,
    };
    socket.broadcast.to(data.roomId).emit("user-joined", _data);
  });

  socket.on("send-message", (payload) => {
    socket.broadcast.to(payload.roomId).emit("receive-message", {
      roomId: payload.roomId,
      sender: payload.sender,
      message: payload.message,
    });
  });

  socket.on("load-video", async (payload) => {
    await models.Room.update(
      { video: payload.video },
      { where: { id: payload.roomId } }
    );
    socket.broadcast.to(payload.roomId).emit("change-video", payload);
  });

  socket.on("user-disconnect", (payload) => {
    socket.broadcast.to(payload.roomId).emit("user-left", {
      roomId: payload.roomId,
      sender: payload.sender,
      message: `${payload.leaver.firstName} left the chat`,
    });
  });

  socket.on("video-play", async (payload) => {
    await models.Room.update(
      { playing: true },
      { where: { id: payload.roomId } }
    );
    socket.broadcast.to(payload.roomId).emit("video-play");
  });

  socket.on("video-pause", async (payload) => {
    await models.Room.update(
      { playing: false },
      { where: { id: payload.roomId } }
    );
    socket.broadcast.to(payload.roomId).emit("video-pause");
  });

  socket.on("seek-video", async (payload) => {
    await models.Room.update(
      { played: payload.seek },
      { where: { id: payload.roomId } }
    );
    socket.broadcast.to(payload.roomId).emit("seek-video", payload.seek);
  });
}

module.exports = socketActions;
