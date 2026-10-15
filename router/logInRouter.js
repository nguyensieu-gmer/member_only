const { Router } = require("express");
const logInRouter = Router();
const passport = require("passport");

logInRouter.get("/", (req, res) => {
  res.render("log-in");
});
logInRouter.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in/failure",
    failureMessage: true,
  }),
);

logInRouter.get("/failure", (req, res) => {
  const messages = req.session.messages || [];
  const error = messages.pop();

  res.render("log-in", { error });

  // Xóa mảng nếu không còn thông báo
  if (messages.length === 0) {
    delete req.session.messages;
  }
});

module.exports = logInRouter;
