const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
// session module?

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

module.exports = passport;
