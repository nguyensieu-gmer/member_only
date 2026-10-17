const db = require("../db/queries");

async function getHome(req, res) {
  const messages = await db.selectAllMsgAndUser();
  const user = await db.selectUserById(req.user);
  const username = user ? user.username : undefined;
  res.render("home", { username, messages, member: user.member === 1 });
}

module.exports = { getHome };
