const express = require("express");
const router = express.Router();

//Middleware
const tokencheck = require("../middleware/tokencheck");
const validation = require("../middleware/validation");
const { orderValidation } = require("../constant/validations");

//Controller
const {
  placeOrder,
  orders,
  orderDetails,
} = require("../controller/order.controller");

// router.get("/", tokencheck(), getCartItems);
router.post("/", tokencheck(), validation(orderValidation), placeOrder);
router.get("/", tokencheck(), orders);
router.get("/:id", tokencheck(), orderDetails);

module.exports = router;
