const db = require("../db/queries");

const getMemberShip = async (req, res) => {
  if (!req.user) {
    return res.redirect("/");
  }
  const user = await db.selectUserById(req.user);
  res.render("membership", { member: user.member === 1 });
};

const postMemberShip = async (req, res) => {
  if (req.body.membership_key === "member") {
    await db.updateMemberShip(req.user);
  }
  res.redirect("/member-ship");
};

const postCancelMemberShip = async (req, res) => {
  await db.updateCancelMemberShip(req.user);
  res.redirect("/member-ship");
};

module.exports = { getMemberShip, postCancelMemberShip, postMemberShip };
