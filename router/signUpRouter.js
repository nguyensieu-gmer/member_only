const { Router } = require("express");
const signUpRouter = Router();
const signUpCtrl = require("../controller/signUpController");

signUpRouter.get("/", signUpCtrl.getSignUp);
signUpRouter.post("/", signUpCtrl.postSignUp);

module.exports = signUpRouter;
