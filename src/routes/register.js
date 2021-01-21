const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { getAccountByEmail, createAccount } = require("../util/account");
const bcrypt = require("bcryptjs");
const router = express.Router();
require("dotenv").config();

router.post("/", async (req, res) => {
  let newAcct = req.body;
  const hashedPassword = await bcrypt.hash(newAcct.password, 10);
  const existingAcct = await getAccountByEmail(newAcct.email);
  if (existingAcct) {
    res.status(500).send({ error: "Could Not Create Account" });
  }
  newAcct = await createAccount({ ...newAcct, password: hashedPassword });
  res.send(newAcct);
});

module.exports = router;
