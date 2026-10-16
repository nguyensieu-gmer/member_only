const db = require("../db/queries");

async function getHome(req, res) {
  const messages = await db.selectAllMsg();
  const user = await db.selectUserById(req.user);
  const username = user ? user.username : undefined;
  res.render("home", { username, messages });
}

module.exports = { getHome };
