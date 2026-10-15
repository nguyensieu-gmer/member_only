const express = require("express");
const app = express();
const path = require("node:path");
const signUpRouter = require("./router/signUpRouter");
const homeController = require("./controller/homeController");
const logInRouter = require("./router/logInRouter");
const session = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db/pool");

// pg connect
const sessionStore = new pgSession({
  pool: pool,
  tableName: "sessions",
  createTableIfMissing: true,
});

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// session
app.use(
  session({
    store: sessionStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// share user in all app
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.get("/", homeController.getHome);
app.use("/sign-up", signUpRouter);
app.use("/log-in", logInRouter);
app.get("/log-out", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Express app is listening on localhost:${PORT}`);
});
