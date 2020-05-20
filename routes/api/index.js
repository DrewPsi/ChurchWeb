var express = require("express");

var router = express.Router();

router.use("/users", require("./users"));

router.use("/scheduling", require("./scheduling"));

module.exports = router;