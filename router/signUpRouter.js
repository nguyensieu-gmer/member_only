const express = require("express");
const signUpRouter = express();
const signUpCtrl = require("../controller/signUpController");

signUpRouter.get("/", signUpCtrl.getSignUp);
signUpRouter.post("/", signUpCtrl.postSignUp);

module.exports = signUpRouter;
