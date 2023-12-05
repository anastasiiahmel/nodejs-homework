// const contacts = require("../models/contacts");

// const { HttpErrors } = require("../helpers/HttpErrors");
const { controlErrors } = require("../helpers/controlErrors");
const Contact = require("../schemas/contacts");

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

// const getById = async (req, res) => {
//   const { contactId } = req.params;
//   const resultId = await Contact.getContactById(contactId);
//   res.json(resultId);
// };

// const getAdd = async (req, res) => {
//   const resultAdd = await Contact.addContact(req.body);
//   res.status(201).json(resultAdd);
// };

// const getDelete = async (req, res) => {
//   const { contactId } = req.params;
//   const resultDelete = await Contact.removeContact(contactId);
//   if (!resultDelete) {
//     throw HttpErrors(404, "Not found");
//   }
//   res.json({ message: "Delete success !" });
// };

// const getUpdate = async (req, res) => {
//   const { contactId } = req.params;
//   const resultUpdate = await Contact.updateContact(contactId, req.body);
//   if (!resultUpdate) {
//     throw HttpErrors(404, "Not found !");
//   }
//   res.json(resultUpdate);
// };
module.exports = {
  getAll: controlErrors(getAll),
  // getById: controlErrors(getById),
  // getAdd: controlErrors(getAdd),
  // getDelete: controlErrors(getDelete),
  // getUpdate: controlErrors(getUpdate),
};
