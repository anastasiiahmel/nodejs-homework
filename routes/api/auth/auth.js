const express = require("express");
const router = express.Router();

const controllers = require("../../../controllers");

const { validateCode, authorization } = require("../../../middlewares");

const schemaUsers = require("../../../schemas");

router.get("/current", authorization, controllers.getCurrent);

router.post(
  "/register",
  validateCode(schemaUsers.schemaReg),
  controllers.getRegister
);

router.post(
  "/login",
  validateCode(schemaUsers.schemaLog),
  controllers.getLogin
);

router.post("/logout", authorization, controllers.getLogOut);

module.exports = router;
