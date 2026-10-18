const express = require("express");
const app = express();
const path = require("node:path");
const signUpRouter = require("./router/signUpRouter");
const homeController = require("./controller/homeController");
const logInRouter = require("./router/logInRouter");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db/pool");
const passport = require("./config/passport");
const addMsgRouter = require("./router/addMsgRouter");
const memberShipRouter = require("./router/memberShipRouter");
const adminRouter = require("./router/adminRouter");
const isAuth = require("./middleware/isAuth");

// pg connect
const sessionStore = new pgSession({
  pool: pool,
  tableName: "sessions",
  createTableIfMissing: true,
});

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
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
app.use("/add-message", isAuth, addMsgRouter);
app.use("/member-ship", isAuth, memberShipRouter);
app.use("/admin", isAuth, adminRouter);

// error handler
app.use((err, req, res, next) => {
  if (err.statusCode === 401 && err.name === "Authenticated Error") {
    return res
      .status(err.statusCode || 401)
      .render("authProblemVibe", { message: err.message, name: err.name });
  }
  return next();
});

app.use((err, req, res, next) => {
  if (err.statusCode === 401 && err.name === "Authorization Error") {
    return res
      .status(err.statusCode || 401)
      .render("authProblemVibe", { message: err.message, name: err.name });
  }
  return next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Express app is listening on localhost:${PORT}`);
});
