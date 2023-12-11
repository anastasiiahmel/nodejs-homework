const { controlErrors } = require("./controlErrors/controlErrors");
const { errorMongoose } = require("./errorMongoose/errorMongoose");
const { HttpErrors } = require("./HttpErrors/HttpErrors");

module.exports = {
  controlErrors,
  errorMongoose,
  HttpErrors,
};
