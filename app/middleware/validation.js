const { StatusCodes } = require("http-status-codes");
const { Validator } = require("node-input-validator");
const { commonerror } = require("../constant/common_response");

module.exports = function (validation) {
  return async function (req, res, next) {
    try {
      const validationObj = {};

     
      for (const item of Object.keys(validation)) {
        validationObj[item] = validation[item];
      }

      const v = new Validator(req.body, validationObj);
      const matched = await v.check(); // Validation Check

      // Validation Error
      if (!matched) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json(commonerror(v.errors, "Validation error.")); //Required Validation in response
      }
      next();
    } catch (err) {
      console.log("-----Validations Middleware err ----", err);
      return res
          .status(StatusCodes.BAD_REQUEST)
          .json(commonerror(err, "Validation error."));
    }
  };
};
