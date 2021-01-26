const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getMyFriends, sendFriendRequest } = require("../util/friend");

// /friends
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const acctId = req.user.id;
      const myFriends = await getMyFriends(acctId);
      res.send(myFriends);
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  }
);

//friend request
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const acctId = req.user.id;
      await sendFriendRequest(acctId, req.query.friendId);
      res.send(true);
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  }
);

module.exports = router;
