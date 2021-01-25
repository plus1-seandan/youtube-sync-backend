const express = require("express");
const router = express.Router();
// const pool = require("../config/db");
const Account = require("../models/account");
const { Op } = require("sequelize");
const Friend = require("../models/friend");
const passport = require("passport");
const models = require("../models");

const PAGE_SIZE = 10;

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      res.send(req.user);
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  }
);

router.get(
  "/search",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // res.send(req.user);
      const { search, page } = req.query;

      const acctCount = await models.Account.count({
        where: { email: { [Op.like]: `%${search}%` } },
      });

      const pages = parseInt(acctCount / PAGE_SIZE);

      const accts = await getUsers(page, search);

      res.send({ pages, accts });
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  }
);

const getUsers = async (page, query) => {
  const skip = (page - 1) * PAGE_SIZE;
  return await models.Account.findAll({
    where: { email: { [Op.like]: `%${query}%` } },
    offset: skip,
    limit: PAGE_SIZE,
    order: [["email", "ASC"]],
  });
};

router.post("/create-account", async (req, res) => {
  const loginAcct = req.body;
  try {
    Account.findAll({
      where: {
        email: loginAcct.email,
      },
    }).then((accounts) => {
      if (accounts.length !== 0) {
        res.send("Failed");
        return;
      }
      try {
        Account.create({
          firstName: loginAcct.firstName,
          lastName: loginAcct.lastName,
          email: loginAcct.email,
          password: loginAcct.password,
        });
      } catch (error) {
        console.log(error.message);
      }
      res.send("Success");
    });
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/sign-in", async (req, res) => {
  const acct = req.query;

  try {
    Account.findAll({
      where: {
        email: acct.username,
        password: acct.password,
      },
    }).then((account) => {
      if (account.length !== 1) {
        res.send("Failed");
      } else {
        res.json(account[0]);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/search-friends", async (req, res) => {
  const acct = req.query;

  try {
    Account.findAll({
      include: [
        {
          model: Friend,
          where: {
            RequestorId: acct.userId,
          },
          required: true,
        },
      ],
      raw: true,
    }).then((accounts) => {
      res.send(accounts);
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/search-users", async (req, res) => {
  const data = req.query;
  try {
    Account.findAll({
      where: {
        email: {
          [Op.like]: "%" + data.query + "%",
        },
      },
      include: [
        {
          model: Friend,
          where: {
            RequestorId: data.acctId,
          },
          required: false,
        },
      ],
      raw: true,
    }).then((accounts) => {
      res.send(accounts);
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/add-friend", async (req, res) => {
  try {
    const data = req.body;

    Friend.create({
      RequestorId: data.currUserId,
      RequesteeId: data.userId,
    })
      .then((friend) => {
        res.send("Success");
      })
      .catch((err) => {
        console.log(err);
        res.send("Error");
      });
  } catch (err) {
    console.log(err.message);
  }
});

router.delete("/delete-friend", async (req, res) => {
  try {
    const data = req.query;
    Friend.destroy({
      where: {
        RequestorId: data.userId,
        RequesteeId: data.friendId,
      },
    });
    res.send("Success");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
