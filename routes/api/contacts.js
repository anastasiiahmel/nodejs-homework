const express = require("express");
const router = express.Router();

const controllers = require("..//../controllers/index");

// const { validateCode } = require("../../middlewares/validateBody");
// const verificationData = require("../../schemas/contacts");

router.get("/", controllers.getAll);

// router.get("/:contactId", controllers.getById);

// router.post("/", validateCode(verificationData.checks), controllers.getAdd);

// router.delete("/:contactId", controllers.getDelete);

// router.put(
//   "/:contactId",
//   validateCode(verificationData.checks),
//   controllers.getUpdate
// );

module.exports = router;
