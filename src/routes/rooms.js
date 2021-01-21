const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getMyRooms, createRoom, getRoomMembers } = require("../util/room");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const acctId = req.user.id;
      const myRooms = await getMyRooms(acctId);
      console.log({ myRooms });
      res.send(myRooms);
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
      console.log({ body: req.body });
      const newRoom = await createRoom(acctId, req.body);
      console.log({ newRoom });
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
      console.log(members);
      res.send(members);
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
