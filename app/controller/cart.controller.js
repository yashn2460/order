const { StatusCodes, ReasonPhrases } = require("http-status-codes"); // For status codes
const { commonsuccess, commonerror } = require("../constant/common_response"); // For Common responses
const { cartMessages } = require("../constant/messages"); // For dynamic message

//Models
const CartItems = require("../model/cartItems.model");
const Cart = require("../model/cart.model");
const Book = require("../model/books.model");

exports.addToCart = async (req, res) => {
  try {
    const { bookId, quantity, cartId } = req.body;
    //Adding to cart-Item
    const cart = await CartItems.create({
      cartId,
      quantity,
      bookId,
    });
    //Increment cart quantity
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
          as: "cartItems", // Join cartItems
          include: [
            {
              model: Book,
              as: "book", // Join book
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

    //Decrement cart quantity
    await Cart.decrement("quantity", {
      by: cartItem.quantity,
      where: { id: cartItem.cartId },
    });
     //Remove cart item
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
