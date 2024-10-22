const express = require("express");
const router = express.Router();

//Middleware
const validation = require("../middleware/validation");
const {
  registerValidation,
  loginValidation,
} = require("../constant/validations");

//Controller
const { register, login } = require("../controller/userAuth.controller");

router.post("/register", validation(registerValidation), register);
router.post("/login", validation(loginValidation), login);

module.exports = router;
