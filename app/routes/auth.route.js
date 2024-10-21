const express = require("express");
const router = express.Router();

//Middleware
const validation = require("../middleware/validation");

//Controller
const { register, login } = require("../controller/userAuth.controller");

router.post(
  "/register",
  validation(["firstName", "lastName", "email", "password"]),
  register
);
router.post("/login", validation(["email", "password"]), login);

module.exports = router;
