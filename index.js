const chalk = require("chalk");
const { Command } = require("commander");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./contacts");

const program = new Command();

program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const foundContact = await getContactById(id);
      if (foundContact) {
        console.log(chalk.green("Contact found"));
        console.log(foundContact);
      } else {
        console.log(chalk.yellow("Contact not found"));
      }
      break;

    case "add":
      const addedContact = await addContact(name, email, phone);
      console.log(chalk.green("Add new contact"));
      console.log(addedContact);
      break;

    case "remove":
      const updateContacts = await removeContact(id);
      console.log(chalk.green("Contact was deleted"));
      console.log("Updated contacts list ⬇");
      console.table(updateContacts);
      break;

    case "update":
      const updatedContacts = await updateContact(id, name, email, phone);
      console.log(chalk.green("Contact was update"));
      console.log("Updated contacts list ⬇");
      console.table(updatedContacts);
      break;

    default:
      console.warn(chalk.red("Unknown action type!"));
  }
};

invokeAction(argv).then(() => {
  console.log("Operation successfully");
});
