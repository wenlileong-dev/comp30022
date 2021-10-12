const { Contacts, Groups } = require("../models/db.js");

const group = require("./groupController");

// Get a list of all contacts
exports.displayContacts = async (req, res, next) => {
  try {
    const allContacts = await Contacts.find({});
    res.status(200).json({
      allContacts,
    });
  } catch (err) {
    next(err);
  }
};

// Get page of contact-adding
exports.displayAddContact = async (req, res, next) => {
  try {
    res.json({
      status: 200,
    });
  } catch (err) {
    next(err);
  }
};

// Add a new contact
exports.addContact = async (req, res, next) => {
  try {
    let userID = req.user._id;
    // 	let { firstName, lastName, email, time, people, eventType, location } =
    let anotherContact = req.body.contact;
    anotherContact.userID = userID;
    const newContact = new Contacts(anotherContact);
    newContact.save();

    //set a group
    if (newContact.groupID) {
      const groupSelected = await Groups.findById(newContact.groupID);
      groupSelected.contacts.push(newContact._id + "");
      Groups.updateOne(
        { _id: groupSelected._id },
        { $set: { contacts: groupSelected.contacts } },
        () => {}
      );
    }

    res.status(201).json({
      newContact,
    });
  } catch (err) {
    next(err);
  }
};

// Get information of a specific contact
exports.getInformation = async (req, res, next) => {
  try {
    const info = await Contacts.findById(req.params.id);

    if (!info) {
      return res.status(404).end();
    }
    res.status(200).json({
      info,
      status: 200,
    });
  } catch (err) {
    next(err);
  }
};

//all contacts for the one account
exports.getAllContacts = async (req, res) => {
  let userID = req.user._id;
  let result = [];

  let allContact = await Contacts.find({
    userID: userID,
  }).sort({ contactTime: -1 });
  if (allContact.length > 5) {
    result = allContact.slice(0, 5);
    res.json({ status: 200, data: result, success: true });
  } else {
    result = allContact;
    res.json({ status: 200, data: result, success: true });
  }
};

// Update information of a specific contact
exports.updateInformation = async (req, res, next) => {
  try {
    const newInfo = req.body.contact;

    const prevInfo = await Contacts.findById(req.params.id);

    if (!prevInfo) {
      return res.status(404).end();
    }

    // Update contact group
    if (prevInfo.groupID != newInfo.groupID) {
      // Remove contact from previous group
      const prevGroup = await Groups.findById(prevInfo.groupID);
      const index = prevGroup.contacts.indexOf(req.params.id);

      if (index > -1) {
        prevGroup.contacts.splice(index, 1);
        Groups.updateOne(
          { _id: prevGroup._id },
          { $set: { contacts: prevGroup.contacts } },
          () => {}
        );
      }

      // Insert contact into the new group
      const currGroup = await Groups.findById(newInfo.groupID);
      currGroup.contacts.push(req.params.id);
      Groups.updateOne(
        { _id: currGroup._id },
        { $set: { contacts: currGroup.contacts } },
        () => {}
      );
    }

    // Update new information
    await Contacts.updateOne(
      { _id: req.params.id },
      { $set: newInfo },
      () => {}
    );

    const info = await Contacts.findById(req.params.id, (err, data) => {});

    res.status(201).json({
      info,
    });
  } catch (err) {
    next(err);
  }
};

// Delete a contact
exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await Contacts.findById(req.params.id);

    if (!contact) {
      return res.status(404).end();
    }

    // Delete the contact from its group
    const group = await Groups.findById(contact.groupID);
    const index = group.contacts.indexOf(req.params.id);

    if (index > -1) {
      group.contacts.splice(index, 1);
      Groups.updateOne(
        { _id: group._id },
        { $set: { contacts: group.contacts } },
        () => {}
      );
    }

    Contacts.deleteOne({ _id: req.params.id }, () => {});

    res.status(204).end();
  } catch {
    next(err);
  }
};

// Search Contacts
exports.searchContacts = async (req, res, next) => {
  try {
    // Get search keyword from query params
    const firstName = req.query.firstname.replace(/\s*/g,"");
    const lastName = req.query.lastname.replace(/\s*/g,"");

    console.log(firstName, lastName);
    let userID = req.user._id;
    let result = [];

    // Search contacts by keywords
    if (firstName || lastName) {
      // Construct regular expressions
      const reg_1 = new RegExp('^'+firstName);
      const reg_2 = new RegExp('^'+lastName);

      const result = await Contacts.find({
        userID: userID,
        firstName: {$regex: reg_1, $options:'i'},
        lastName: {$regex: reg_2, $options:'i'}
      })

      res.status(200).json({
        result,
      });
    }
    else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}
// module.exports = contacts;
