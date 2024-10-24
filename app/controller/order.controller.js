const { StatusCodes, ReasonPhrases } = require("http-status-codes") ;// For status codes
const { commonsuccess, commonerror } = require("../constant/common_response"); // For Common responses
const { orderMessages } = require("../constant/messages"); // For dynamic message

//Models
const Order = require("../model/orders.model");
const OrderItem = require("../model/orderItems.model");
const CartItems = require("../model/cartItems.model");
const Book = require("../model/books.model");

exports.placeOrder = async (req, res) => {
  try {
    const { cartId } = req.body;
    const cartItem = await CartItems.findAll({
      where: { cartId },
      include: [
        {
          model: Book,
          as: "book",
        },
      ],
    });
    //Finding Total amount of order
    const totalAmount = cartItem.reduce((total, item) => {
      return total + item.book.price;
    }, 0);

    const order = await Order.create({
      totalAmount: totalAmount,
      userId: req.user.id,
    });

     //Finding Per item cost
    const itemArray = cartItem.map((item) => {
      return {
        orderId: order.id,
        bookId: item.book.id,
        quantity: item.quantity,
        priceAtPurchase: item.book.price,
      };
    });
    await OrderItem.bulkCreate(itemArray);
    return res
      .status(StatusCodes.OK)
      .json(commonsuccess(order, orderMessages.orderPlace));
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(commonerror(error, ReasonPhrases.BAD_REQUEST));
  }
};
exports.orders = async (req, res) => {
  try {
    const { id } = req.user;
    const orders = await Order.findAll({
      where: { userId: id },
      include: [
        {
          model: OrderItem,
          as: "orderItems",
        },
      ],
    });
    return res
      .status(StatusCodes.OK)
      .json(commonsuccess(orders, orderMessages.orderList));
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(commonerror(error, ReasonPhrases.BAD_REQUEST));
  }
};

exports.orderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderItem,
          as: "orderItems",
        },
      ],
    });

    // If order not exist
    if (!order) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(
          commonerror({}, orderMessages.orderNotExist, StatusCodes.NOT_FOUND)
        );
    }

    return res
      .status(StatusCodes.OK)
      .json(commonsuccess(order, orderMessages.orderDetails));
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(commonerror(error, ReasonPhrases.BAD_REQUEST));
  }
};
