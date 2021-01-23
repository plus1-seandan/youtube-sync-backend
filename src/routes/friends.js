const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getMyFriends } = require("../util/friend");

// /friends
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const acctId = req.user.id;
      const myFriends = await getMyFriends(acctId);
      console.log({ myFriends });
      res.send(myFriends);
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  }
);

module.exports = router;
