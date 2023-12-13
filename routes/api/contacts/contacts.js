const express = require("express");
const router = express.Router();

const controllers = require("../../../controllers");

const {
  validateCode,
  isValidId,
  notValidBody,
  authorization,
} = require("../../../middlewares");

const verificationData = require("../../../schemas");

router.get("/", authorization, controllers.getAll);

router.get("/:contactId", authorization, controllers.getById);

router.post(
  "/",
  authorization,
  validateCode(verificationData.schemaJoi),
  controllers.getAdd
);

router.delete("/:contactId", authorization, isValidId, controllers.getDelete);

router.put(
  "/:contactId",
  authorization,
  isValidId,
  validateCode(verificationData.schemaJoi),
  controllers.getUpdate
);

router.patch(
  "/:contactId/favorite",
  authorization,
  notValidBody,
  isValidId,
  validateCode(verificationData.favoriteSchema),
  controllers.getUpdateStatus
);
module.exports = router;
