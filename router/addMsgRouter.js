const { Router } = require("express");
const { body } = require("express-validator");
const addMsgRouter = Router();
const addMsgController = require("../controller/addMsgController");

addMsgRouter.get("/", addMsgController.getAddMessage);

addMsgRouter.post("/", addMsgController.postAddMessage);

module.exports = addMsgRouter;
