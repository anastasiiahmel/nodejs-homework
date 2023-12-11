const express = require("express");
const router = express.Router();

const controllers = require("../../../controllers");

const {
  validateCode,
  isValidId,
  notValidBody,
} = require("../../../middlewares");


const verificationData = require("../../../schemas");

router.get("/", controllers.getAll);

router.get("/:contactId", controllers.getById);

router.post("/", validateCode(verificationData.schemaJoi), controllers.getAdd);

router.delete("/:contactId", isValidId, controllers.getDelete);

router.put(
  "/:contactId",
  isValidId,
  validateCode(verificationData.schemaJoi),
  controllers.getUpdate
);

router.patch(
  "/:contactId/favorite",
  notValidBody,
  isValidId,
  validateCode(verificationData.favoriteSchema),
  controllers.getUpdateStatus
);
module.exports = router;
