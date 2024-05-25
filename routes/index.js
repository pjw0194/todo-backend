const express = require("express");
const router = express.Router();
const taskApi = require("./taskRouter");
const userApi = require("./userRouter");

router.use("/tasks", taskApi);
router.use("/user", userApi);

module.exports = router;
