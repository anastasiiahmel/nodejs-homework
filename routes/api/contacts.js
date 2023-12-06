const express = require("express");
const router = express.Router();

const controllers = require("..//../controllers/index");

const { validateCode } = require("../../middlewares/validateBody");
const isValidId = require("../../middlewares/isValidId");
const notValidBody = require("../../middlewares/notValidBody");

const verificationData = require("..//../schemas/contacts");

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
