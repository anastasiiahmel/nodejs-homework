const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

const { nanoid } = require("nanoid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const users = await listContacts();
  const resultId = users.find((itm) => itm.id === contactId);
  if (resultId) return resultId;
  return null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removeContact = contacts.findIndex((itm) => itm.id === contactId);
  if (removeContact === -1) {
    return null;
  }
  const [result] = contacts.splice(removeContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  const addContact = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, addContact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contacSearch = contacts.findIndex((itm) => itm.id === contactId);
  if (contacSearch === -1) {
    return null;
  }
  contacts[contacSearch] = {
    id: nanoid(),
    ...body,
  };
  const updates = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, updates);
  return contacts[contacSearch];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
