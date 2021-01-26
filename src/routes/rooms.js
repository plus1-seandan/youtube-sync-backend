const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getMyRooms,
  createRoom,
  getRoomMembers,
  addMemberToRoom,
  getRoom,
  getPublicRooms,
} = require("../util/room");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const acctId = req.user.id;
      const myRooms = await getMyRooms(acctId);
      res.send(myRooms);
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  }
);

router.get(
  "/public",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const rooms = await getPublicRooms();
      res.send(rooms);
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  }
);

router.get(
  "/id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const roomId = req.query.id;
      const data = await getRoom(roomId);
      res.send(data);
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const acctId = req.user.id;
      const newRoom = await createRoom(acctId, req.body);
      res.send(newRoom);
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  }
);

router.get(
  "/members",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const roomId = req.query.id;
      const members = await getRoomMembers(roomId);
      res.send(members);
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  }
);

router.post(
  "/members",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const memberId = req.query.memberId;
      const roomId = req.query.roomId;

      const member = await addMemberToRoom(memberId, roomId);
      res.send(member);
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  }
);

router.get("/get-my-rooms", async (req, res) => {
  try {
    const userId = req.query.userId;
    const myRooms = await Room.findAll({
      include: [
        {
          model: AccountRoom,
          where: {
            AccountId: userId,
          },
          required: true,
          raw: true,
        },
      ],
      raw: true,
    });
    res.json(myRooms);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/create-room", async (req, res) => {
  try {
    const data = req.body;
    Room.create({
      name: data.room.name,
      private: data.room.isPrivate,
      password: data.room.password,
    }).then((room) => {
      try {
        AccountRoom.create({
          AccountId: data.user.id,
          RoomId: room.id,
        }).then((acctRoom) => {
          res.json(room);
        });
      } catch (error) {
        console.log(error.message);
      }
    });
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/add-member", async (req, res) => {
  try {
    const data = req.body;
    AccountRoom.create({
      AccountId: data.userId,
      RoomId: data.roomId,
    });
    res.send("Success");
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/search-room-members", async (req, res) => {
  try {
    const roomId = req.query.roomId;
    AccountRoom.findAll({
      attributes: ["AccountId"],
      where: {
        RoomId: roomId,
      },
      raw: true,
    }).then((memberIds) => {
      const arr = memberIds.map((obj) => obj.AccountId);
      Account.findAll({
        where: { id: arr },
        raw: true,
      }).then((roomMembers) => {
        res.send(roomMembers);
      });
    });
  } catch (err) {
    console.log(err.message);
  }
});

router.delete("/delete-room", async (req, res) => {
  try {
    const data = req.query;
    AccountRoom.destroy({
      where: {
        AccountId: data.userId,
        RoomId: data.roomId,
      },
    });
    res.send("Success");
  } catch (err) {
    console.log(err.message);
  }
});
module.exports = router;
