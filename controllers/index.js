const contacts = require("../models/contacts");

const { HttpErrors } = require("../helpers/HttpErrors");
const { controlErrors } = require("../helpers/controlErrors");

const getAll = async (req, res) => {
  const allContacts = await contacts.listContacts();
  res.json(allContacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const resultId = await contacts.getContactById(contactId);
  res.json(resultId);
};

const getAdd = async (req, res) => {
  const resultAdd = await contacts.addContact(req.body);
  res.status(201).json(resultAdd);
};

const getDelete = async (req, res) => {
  const { contactId } = req.params;
  const resultDelete = await contacts.removeContact(contactId);
  if (!resultDelete) {
    throw HttpErrors(404, "Not found");
  }
  res.json({ message: "Delete success !" });
};

const getUpdate = async (req, res) => {
  const { contactId } = req.params;
  const resultUpdate = await contacts.updateContact(contactId, req.body);
  if (!resultUpdate) {
    throw HttpErrors(404, "Not found !");
  }
  res.json(resultUpdate);
};
module.exports = {
  getAll: controlErrors(getAll),
  getById: controlErrors(getById),
  getAdd: controlErrors(getAdd),
  getDelete: controlErrors(getDelete),
  getUpdate: controlErrors(getUpdate),
};
