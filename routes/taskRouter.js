const express = require("express");
const taskController = require("../controller/taskController");
const router = express.Router();

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);

router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
