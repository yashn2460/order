const express = require("express");
const router = express.Router();

//Middleware
const tokencheck = require("../middleware/tokencheck");
const validation = require("../middleware/validation");
//Controller
const {
  addToCart,
  getCartItems,
  removeCartItem,
} = require("../controller/cart.controller");

router.get("/", tokencheck(), getCartItems);
router.post(
  "/",
  tokencheck(),
  validation(["bookId", "quantity", "cartId"]),
  addToCart
);
router.delete("/:itemId", tokencheck(), removeCartItem);

module.exports = router;
