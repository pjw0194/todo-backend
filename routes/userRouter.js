const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const authController = require("../controller/authController");

// 1. create Sign up endpoint
router.post("/", userController.createUser);

// 2. create Sign in endpoint
router.post("/login", userController.loginWithEmail);

router.get("/me", authController.authenticate, userController.getUser);

module.exports = router;
