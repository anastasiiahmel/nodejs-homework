const express = require("express");
const router = express.Router();

const controllers = require("../../../controllers");

const { validateCode, authorization, upload } = require("../../../middlewares");

const schemaUsers = require("../../../schemas");

router.get("/current", authorization, controllers.getCurrent);

router.get("/verify/:verificationToken", controllers.verifyEmail);
router.post(
  "/register",
  validateCode(schemaUsers.schemaReg),
  controllers.getRegister
);

router.post(
  "/verify",
  validateCode(schemaUsers.emailSchema),
  controllers.resendEmail
);

router.post(
  "/login",
  validateCode(schemaUsers.schemaLog),
  controllers.getLogin
);

router.post("/logout", authorization, controllers.getLogOut);

router.patch(
  "/avatars",
  authorization,
  upload.single("avatar"),
  controllers.getUpdateAvatar
);

module.exports = router;
