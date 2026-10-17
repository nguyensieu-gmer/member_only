const { Router } = require("express");
const memberShipRouter = Router();
const memberController = require("../controller/memberController");

memberShipRouter.get("/", memberController.getMemberShip);
memberShipRouter.post("/", memberController.postMemberShip);
memberShipRouter.get("/cancel", memberController.postCancelMemberShip);

module.exports = memberShipRouter;
