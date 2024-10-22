const { commonerror, commonsuccess } = require("../constant/common_response");// For Common responses
const { authMessage } = require("../constant/messages");// For dynamic message
const { StatusCodes, ReasonPhrases } = require("http-status-codes");// For status codes
const bcrypt = require("bcryptjs");//for password hashing

//service
const { tokenGenerate } = require("../services/auth.service");

//Models
const Cart = require("../model/cart.model");
const User = require("../model/users.model");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userExist = await User.findOne({ where: { email } });

    //If user Exist
    if (userExist){
      return res
      .status(StatusCodes.BAD_REQUEST)
      .json(commonerror({}, authMessage.emailAlreadyExists));
    }

    const hashPassword = bcrypt.hashSync(password, 10); // password Hashing

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    // Creating cart for registered user
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

     //If user not Exist
    if (!user)
      return res.status(400).json(commonerror({}, authMessage.userNotFound));

     //Password check
    if (!bcrypt.compareSync(password, user.password))
      return res
        .status(400)
        .json(commonerror({}, authMessage.invalidCredentials));

    const cart = await Cart.findOne({ where: { userId: user.id } });

     //Auth token generate
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
