const express = require("express");
const router = express.Router();

//Middleware
const tokencheck = require("../middleware/tokencheck");
const validation = require("../middleware/validation");
//Controller
const {
  placeOrder,
  orders,
  orderDetails,
} = require("../controller/order.controller");

// router.get("/", tokencheck(), getCartItems);
router.post("/", tokencheck(), validation(["cartId"]), placeOrder);
router.get("/", tokencheck(), orders);
router.get("/:id", tokencheck(), orderDetails);

module.exports = router;
