const db = require("../db/queries");
const isAdmin = require("../middleware/isAdmin");

const getAdminField = async (req, res) => {
  if (!req.user) {
    res.redirect("/");
  }
  const user = await db.selectUserById(req.user);
  res.render("adminVibe", { admin: user.admin === 1 });
};

const postAdminField = async (req, res) => {
  if (req.body.admin_key === "admin") {
    await db.updateAdmin(req.user);
  }
  res.redirect("/admin");
};

const getCancelAdmin = async (req, res) => {
  await db.updateCancelAdmin(req.user);
  res.redirect("/admin");
};

const postRemoveMsgByAdmin = [
  isAdmin,
  async (req, res) => {
    await db.deleteMsgById(req.params.messageid);
    res.redirect("/");
  },
];

module.exports = {
  getAdminField,
  postAdminField,
  getCancelAdmin,
  postRemoveMsgByAdmin,
};
