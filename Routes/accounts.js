const express = require("express");
const router = express.Router();
// const pool = require("../config/db");
const Account = require("../Models/Account");
const { Op } = require("sequelize");
const Friend = require("../Models/Friend");

router.get("/", (req, res) => {
  console.log("account path hit");
  res.send("this worked");
});

router.post("/create-account", async (req, res) => {
  const loginAcct = req.body;
  try {
    Account.findAll({
      where: {
        email: loginAcct.email,
      },
    }).then((accounts) => {
      console.log(accounts);
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

router.get("/search-users", async (req, res) => {
  const data = req.query;
  console.log(data);
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
    console.log("printing add - friend data ");
    console.log(data);

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

// router.post("/create-account", async (req, res) => {
//   try {
//     const newAccount = req.body;
//     const validateAcct = await pool.query(
//       "SELECT account_id, email FROM accounts WHERE email = $1",
//       [newAccount.email]
//     );
//     console.log(validateAcct.rows);
//     if (validateAcct.rows.length !== 0) {
//       console.log("user found");
//       res.send("Failed");
//       return;
//     }
//     try {
//       const validateAcct = await pool.query(
//         "INSERT INTO accounts (account_id, first_name, last_name, email, password) VALUES ($1,$2,$3,$4, $5)",
//         [
//           newAccount.id,
//           newAccount.firstName,
//           newAccount.lastName,
//           newAccount.email,
//           newAccount.password,
//         ]
//       );
//       console.log("success");
//       res.send("Success");
//     } catch (err) {
//       console.log(err.message);
//     }
//   } catch (err) {
//     console.log(err.message);
//   }
// });

// router.get("/sign-in", async (req, res) => {
//   try {
//     const acct = req.query;
//     console.log(acct);
//     const validateAcct = await pool.query(
//       "SELECT email, password FROM accounts WHERE email=$1 AND password=$2",
//       [acct.username, acct.password]
//     );
//     if (validateAcct.rows.length === 0) {
//       res.send("Failed");
//       return;
//     }
//     res.send("Success");
//   } catch (err) {
//     console.log(err.message);
//   }
// });
