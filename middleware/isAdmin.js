const db = require("../db/queries");
const AdminError = require("../error/adminError");

const isAdmin = async (req, res, next) => {
  const user = await db.selectUserById(req.user);
  if (user.admin === 1) {
    next();
  } else {
    throw new MemberError("You must have admin right to use this service");
  }
};

module.exports = isAdmin;
