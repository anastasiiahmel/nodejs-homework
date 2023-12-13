const express = require("express");
const router = express.Router();

const controllers = require("../../../controllers");

const { validateCode } = require("../../../middlewares");

const schemaUsers = require("../../../schemas");

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

module.exports = router;
