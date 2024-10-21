const User = require("../model/users.model");
const bcrypt = require("bcryptjs");
const { commonerror, commonsuccess } = require("../constant/common_response");
const { authMessage } = require("../constant/messages");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { tokenGenerate } = require("../services/auth.service");
const Cart = require("../model/cart.model");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const userExist = await User.findOne({ where: { email } });
    if (userExist)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json(commonerror({}, authMessage.emailAlreadyExists));

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    await Cart.create({
      quantity: 0,
      userId: user.id,
      addedAt: new Date(),
    });

    return res
      .status(StatusCodes.OK)
      .json(commonsuccess({}, authMessage.registrationSuccess));
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(commonerror(error, ReasonPhrases.BAD_REQUEST));
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(400).json(commonerror({}, authMessage.userNotFound));

    if (!bcrypt.compareSync(password, user.password))
      return res
        .status(400)
        .json(commonerror({}, authMessage.invalidCredentials));

    const cart = await Cart.findOne({ where: { userId: user.id } });

    const token = tokenGenerate({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      cartId: cart.id,
    });

    const authData = {
      token,
      cart,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return res
      .status(StatusCodes.OK)
      .json(commonsuccess(authData, authMessage.loginSuccess));
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json(commonerror(error, ReasonPhrases.BAD_REQUEST));
  }
};
