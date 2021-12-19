const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const readContent = async () => {
  const content = await fs.readFile(
    path.join(__dirname, "db", "contacts.json"),
    "utf-8"
  );
  const result = JSON.parse(content);
  return result;
};

const listContacts = async () => {
  return await readContent();
};

const getContactById = async (contactId) => {
  const contacts = await readContent();

  const foundContact = contacts.reduce((acc, contact) => {
    if (contact.id === contactId) {
      acc = contact;
      return acc;
    }
    return acc;
  });

  return foundContact;
};

const removeContact = async (contactId) => {
  const contacts = await readContent();

  const updateContacts = contacts.reduce((array, contact) => {
    if (contact.id !== contactId) {
      array.push(contact);
    }
    return array;
  }, []);

  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(updateContacts, null, 2)
  );
  return updateContacts;
};

const addContact = async (name, email, phone) => {
  const contacts = await readContent();
  const newContact = { name, email, phone, id: crypto.randomUUID() };
  contacts.push(newContact);

  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
};

const updateContact = async (id, name, email, phone) => {
  const contacts = await readContent();

  const updatedContactsList = contacts.reduce((acc, contact) => {
    if (contact.id !== id) {
      acc.push(contact);
    } else {
      acc.push({ id, name, email, phone });
    }
    return acc;
  }, []);

  await fs.writeFile(
    path.join(__dirname, "db", "contacts.json"),
    JSON.stringify(updatedContactsList, null, 2)
  );
  return updatedContactsList;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
