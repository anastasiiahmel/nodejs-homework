const { HttpErrors, controlErrors } = require("../../helpers");

const { Contact } = require("../../schemas/contacts/contacts");

const getAll = async (req, res) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const resultId = await Contact.findById(contactId);
  if (!resultId) {
    throw HttpErrors(404, `Not found ${contactId} !`);
  }
  res.json(resultId);
};

const getAdd = async (req, res) => {
  const resultAdd = await Contact.create(req.body);
  res.status(201).json(resultAdd);
};

const getDelete = async (req, res) => {
  const { contactId } = req.params;
  const resultDelete = await Contact.findByIdAndDelete(contactId);
  if (!resultDelete) {
    throw HttpErrors(404, "Not found!");
  }
  res.json({ message: "Delete success !" });
};

const getUpdate = async (req, res) => {
  const { contactId } = req.params;
  const resultUpdate = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!resultUpdate) {
    throw HttpErrors(404, "Not found !");
  }
  res.json(resultUpdate);
};

const getUpdateStatus = async (req, res) => {
  const { contactId } = req.params;
  const resultStatus = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!resultStatus) {
    throw HttpErrors(404, "Not found !");
  }
  res.json(resultStatus);
};

module.exports = {
  getAll: controlErrors(getAll),
  getById: controlErrors(getById),
  getAdd: controlErrors(getAdd),
  getDelete: controlErrors(getDelete),
  getUpdate: controlErrors(getUpdate),
  getUpdateStatus: controlErrors(getUpdateStatus),
};
