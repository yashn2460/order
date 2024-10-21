const { StatusCodes } = require("http-status-codes");

module.exports = class common_response {
  static commonsuccess(data, message, code = StatusCodes.OK) {
    var success = {
      status: code,
      data: data,
      message: message,
    };
    return success;
  }
  static commonerror(data, message, code = StatusCodes.BAD_REQUEST) {
    var error = {
      data: data,
      status: code,
      message: message,
    };
    return error;
  }
  static tokenError(data = [], message = "") {
    var error = {
      success: false,
      data: data,
      message: message,
      code: StatusCodes.UNAUTHORIZED,
    };
    return error;
  }
};
