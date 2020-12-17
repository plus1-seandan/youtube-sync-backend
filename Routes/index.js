const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("server is up and running");
});

router.use("/accounts", require("./accounts"));
router.use("/rooms", require("./rooms"));
router.use("/youtube", require("./youtube"));

module.exports = router;
