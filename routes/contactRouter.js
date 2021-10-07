const express = require("express");
const contactValidator = require("../validator/contacts");
const contact = require("../controllers/contactController");
const { authUser } = require("../controllers/authUser");

let router = express.Router();

// get a list of all contacts
router.get("/", contact.displayContacts);

router.get("/user-contact", authUser, contact.getUserContacts);

// page of adding
router.get("/add-contact", authUser, contact.displayAddContact);

// add a new contact
router.post(
  "/add-contact",
  authUser,
  contactValidator.addContact,
  contact.addContact
);

// get information of a specific contact
router.get("/info/:id", authUser, contact.getInformation);

// update information of a specific contact
router.put(
  "/info/:id",
  contactValidator.updateInformation,
  contact.updateInformation
);

// delete a contact
router.delete("/info/:id", contact.deleteContact);

router.get("/allContact/", authUser, contact.getAllContacts);

module.exports = router;
