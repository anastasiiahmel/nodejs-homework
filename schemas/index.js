const { User, schemaReg, schemaLog, emailSchema } = require("./users/users");

const { Contact, schemaJoi, favoriteSchema } = require("./contacts/contacts");

module.exports = {
  Contact,
  schemaJoi,
  favoriteSchema,
  User,
  schemaReg,
  schemaLog,
  emailSchema,
};
