const express = require("express");
const router = express.Router();
const taskApi = require("./taskRouter");

router.use("/tasks", taskApi);

module.exports = router;
