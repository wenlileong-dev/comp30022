const {Contacts} = require('../models/db.js')

// Get a list of all contacts
exports.displayContacts = async (req, res, next) => {
	try {
		const allContacts = await Contacts.find({});
		res.status(200).json({
			allContacts
		})
	} catch (err) {
		next(err);
	}
	
}

// Get page of contact-adding
exports.displayAddContact = (req, res, next) => {
	try {
		res.send("get /contacts/add-contact");
	} catch (err) {
		next(err);
	}
}

// Add a new contact
exports.addContact = (req, res, next) => {
	try {
		const newContact = new Contacts (req.body.contact);
		newContact.save();
		// console.log(req.body);
		res.status(201).json({
			newContact
		});	
	} catch (err) {
		next(err);
	}
}

// Get information of a specific contact
exports.getInformation = async (req, res, next) => {
	try {
		const info = await Contacts.findById(req.params.id);

		if (!info) {	
			
			return res.status(404).end();
		}
		res.status(200).json({
			info
		})
	} catch (err) {
		next(err);
	}
}

// Update information of a specific contact
exports.updateInformation = async (req, res, next) => {
	try {
		const newInfo = req.body.contact;
		// console.log(newInfo);
		Contacts.updateOne({'_id': req.params.id}, 
			{$set: newInfo}, () => {});
		const info = await Contacts.findById(req.params.id);

		res.status(201).json({
			info
		})
	} catch (err) {
		next(err); 
	}
}

// Delete a contact
exports.deleteContact = (req, res, next) => {
	try {
		Contacts.deleteOne({'_id': req.params.id}, () =>{});
		res.status(204).end();
	} catch {
		next(err);
	}
}

// module.exports = contacts;