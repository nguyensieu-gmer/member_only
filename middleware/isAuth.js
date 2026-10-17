const AuthenticatedError = require("../error/authError");

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw new AuthenticatedError(
      "You are not log in. Please Log in to use this service",
    );
  }
};

module.exports = isAuth;
