const isValidId = require("./isValidId/isValidId");
const notValidBody = require("./notValidBody/notValidBody");
const { validateCode } = require("./validateCode/validateCode");
const authorization = require("./authorization/authorization");
const upload = require("./upload/upload");

module.exports = {
  isValidId,
  notValidBody,
  validateCode,
  authorization,
  upload,
};
