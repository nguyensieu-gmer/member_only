const db = require("../db/queries");

async function getHome(req, res) {
  const messages = await db.selectAllMsgAndUser();
  const user = await db.selectUserById(req.user);
  const username = user ? user.username : undefined;
  const member = user ? user.member === 1 : false;
  const admin = user ? user.admin === 1 : false;
  res.render("home", {
    username,
    messages,
    member,
    admin,
  });
}

module.exports = { getHome };
