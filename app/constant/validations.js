exports.registerValidation = {
  firstName: "required|string",
  lastName: "required|string",
  email: "required|email",
  password: "required|string",
};

exports.loginValidation = {
  email: "required|email",
  password: "required|string",
};

exports.loginValidation = {
  email: "required|email",
  password: "required|string",
};

exports.cartValidation = {
  bookId: "required|integer",
  quantity: "required|integer",
  cartId: "required|integer",
};

exports.orderValidation = {
  cartId: "required|integer",
};
