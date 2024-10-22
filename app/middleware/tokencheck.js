const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { commonerror } = require("../constant/common_response");
const { authMessage } = require("../constant/messages");

module.exports = function () {
  return async function (req, res, next) {
    try {
      if (
        req.headers.authorization == undefined ||
        req.headers.authorization == "undefined"
      ) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json(
            commonerror({}, authMessage.missingToken, StatusCodes.UNAUTHORIZED)
          );
      }

      // Verify token 
      var decoded = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      req.user = decoded;
      next();
    } catch (error) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          commonerror({}, authMessage.invalidToken, StatusCodes.UNAUTHORIZED)
        );
    }
  };
};
