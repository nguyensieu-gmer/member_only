const db = require("../db/queries");

async function getHome(req, res) {
  const users = await db.selectUsers();
  res.render("home", { users });
}

module.exports = { getHome };
