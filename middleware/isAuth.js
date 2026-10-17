const AuthenticatedError = require("../error/authError");

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw new AuthenticatedError("You are not log in to use this service");
  }
};

module.exports = isAuth;
