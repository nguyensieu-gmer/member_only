const { Router } = require("express");
const adminRouter = Router();
const db = require("../db/queries");
const adminController = require("../controller/adminController");

adminRouter.get("/", adminController.getAdminField);
adminRouter.post("/", adminController.postAdminField);
adminRouter.get("/cancel", adminController.getCancelAdmin);
adminRouter.post(
  "/remove-message/:messageid",
  adminController.postRemoveMsgByAdmin,
);

module.exports = adminRouter;
