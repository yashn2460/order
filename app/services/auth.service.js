const jwt = require("jsonwebtoken");
const tokenGenerate = (tokenObj, expiresIn = 86400) => {
  var token = jwt.sign(tokenObj, process.env.JWT_SECRET, {
    expiresIn, // expires in 24 hour
  });
  return token;
};
module.exports = {
  tokenGenerate,
};
