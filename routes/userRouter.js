const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// 1. create Sign up endpoint
router.post("/", userController.createUser);

// 2. create Sign in endpoint
router.post("/login", userController.loginWithEmail);

module.exports = router;
