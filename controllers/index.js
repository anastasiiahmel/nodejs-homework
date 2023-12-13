const {
  getAll,
  getById,
  getAdd,
  getDelete,
  getUpdate,
  getUpdateStatus,
} = require("./contacts/contacts");

const {
  getRegister,
  getLogin,
  getCurrent,
  getLogOut,
} = require("./auth/users");

module.exports = {
  getAll,
  getById,
  getAdd,
  getDelete,
  getUpdate,
  getUpdateStatus,
  getRegister,
  getLogin,
  getCurrent,
  getLogOut,
};
