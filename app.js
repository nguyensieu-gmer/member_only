const express = require("express");
const app = express();
const path = require("node:path");
const signUpRouter = require("./router/signUpRouter");
const homeController = require("./controller/homeController");

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", homeController.getHome);

app.use("/sign-up", signUpRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Express app is listening on localhost:${PORT}`);
});
