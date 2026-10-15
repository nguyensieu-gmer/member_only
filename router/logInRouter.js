const { Router } = require("express");
const logInRouter = Router();
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const user = await db.selectUserByName(username);
      if (!user) {
        return done(null, false, { message: "Incorrect user name" });
      }
      const match = await bcrypt.compare(password, user.userpassword);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      done(err);
    }
  }),
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.selectUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

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
