const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { commonsuccess, commonerror } = require("../constant/common_response");
const CartItems = require("../model/cartItems.model");
const { cartMessages } = require("../constant/messages");
const Cart = require("../model/cart.model");
const Book = require("../model/books.model");

exports.addToCart = async (req, res) => {
  try {
    const { bookId, quantity, cartId } = req.body;
    const cart = await CartItems.create({
      cartId,
      quantity,
      bookId,
    });
    await Cart.increment("quantity", { by: quantity, where: { id: cartId } });
    return res
      .status(StatusCodes.OK)
      .json(commonsuccess(cart, cartMessages.addToCart));
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(commonerror(error, ReasonPhrases.BAD_REQUEST));
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const { id } = req.user;
    const cart = await Cart.findOne({
      where: { userId: id },
      include: [
        {
          model: CartItems,
          as: "cartItems",
          include: [
            {
              model: Book,
              as: "book", // Ensure this matches the alias defined in your CartItems model association
            },
          ],
        },
      ],
    });
    return res
      .status(StatusCodes.OK)
      .json(commonsuccess(cart, cartMessages.cartDetails));
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(commonerror(error, ReasonPhrases.BAD_REQUEST));
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const cartItem = await CartItems.findOne({ where: { id: itemId } });
    await Cart.decrement("quantity", {
      by: cartItem.quantity,
      where: { id: cartItem.cartId },
    });
    await cartItem.destroy();
    return res
      .status(StatusCodes.OK)
      .json(commonsuccess({}, cartMessages.itemRemoved));
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(commonerror(error, ReasonPhrases.BAD_REQUEST));
  }
};
