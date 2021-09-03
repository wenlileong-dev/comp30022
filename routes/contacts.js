const express = require("express");
const contactValidator = require('../validator/contacts');
const contact = require("../controllers/contacts");

let router = express.Router();

// get a list of all contacts
router.get('/', contact.displayContacts);

// page of adding
router.get('/add-contact', contact.displayAddContact);

// add a new contact
router.post('/add-contact', contactValidator.addContact,
			contact.addContact);

// get information of a specific contact
router.get('/info/:id', contact.getInformation);

// update information of a specific contact
router.put('/info/:id', contactValidator.updateInformation, contact.updateInformation);

// delete a contact
router.delete('/info/:id', contact.deleteContact);

module.exports = router;