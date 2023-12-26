const { controlErrors } = require("./controlErrors/controlErrors");
const { errorMongoose } = require("./errorMongoose/errorMongoose");
const { HttpErrors } = require("./HttpErrors/HttpErrors");
const nodemailerConfig = require("./nodemailer/nodemailerConfig");

module.exports = {
  controlErrors,
  errorMongoose,
  HttpErrors,
  nodemailerConfig,
};
