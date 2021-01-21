const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send("Wrong email or password");
    }
    req.login(user, () => {
      const body = { _id: user.id, email: user.email };

      const token = jwt.sign({ user: body }, process.env.SESSION_SECRET);
      return res.json({ token });
    });
  })(req, res, next);
});

module.exports = router;
