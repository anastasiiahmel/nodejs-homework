const {
  getAll,
  getById,
  getAdd,
  getDelete,
  getUpdate,
  getUpdateStatus,
} = require("./contacts/contacts");

const { getRegister } = require("./auth/users");

module.exports = {
  getAll,
  getById,
  getAdd,
  getDelete,
  getUpdate,
  getUpdateStatus,
  getRegister,
};
