const { Router } = require("express");
const { body } = require("express-validator");
const addMsgRouter = Router();
const addMsgController = require("../controller/addMsgController");
const isAuth = require("../middleware/isAuth");

addMsgRouter.get("/", isAuth, addMsgController.getAddMessage);

addMsgRouter.post("/", isAuth, addMsgController.postAddMessage);

module.exports = addMsgRouter;
