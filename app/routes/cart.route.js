const express = require("express");
const router = express.Router();

//Middleware
const tokencheck = require("../middleware/tokencheck");
const validation = require("../middleware/validation");
const { cartValidation } = require("../constant/validations");

//Controller
const {
  addToCart,
  getCartItems,
  removeCartItem,
} = require("../controller/cart.controller");

router.get("/", tokencheck(), getCartItems);
router.post("/", tokencheck(), validation(cartValidation), addToCart);
router.delete("/:itemId", tokencheck(), removeCartItem);

module.exports = router;
