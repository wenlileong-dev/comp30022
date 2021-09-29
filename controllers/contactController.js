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
exports.displayAddContact = async (req, res, next) => {
	try {
		res.send("get /contacts/add-contact");
	} catch (err) {
		next(err);
	}
}

// Add a new contact
exports.addContact = async (req, res, next) => {
	try {
		let userID = req.user._id;
	// 	let { firstName, lastName, email, time, people, eventType, location } =
    // req.body;
		let anotherContact = req.body.contact
		anotherContact.userID=userID
		console.log(anotherContact)
		const newContact = new Contacts (anotherContact);
		newContact.save();
		// console.log(req.body);
		res.status(200).json({
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
//all contacts for the one account
exports.getAllContacts = async (req, res) => {
	let userID = req.user._id;
  	let result=[];

	let allContact = await Contacts.find({
	  userID: userID
	}).sort({contactTime: -1});
	if(allContact.length>5){
		result=allContact.slice(0,5)
		res.json({ status: 200, data: result, success:true});
	}else{
		result=allContact
		res.json({ status: 200, data: result, success:true});
	}
};

// Update information of a specific contact
exports.updateInformation = async (req, res, next) => {
	try {
		const newInfo = req.body.contact;
		
		// console.log(newInfo);
		await Contacts.updateOne({'_id': req.params.id}, 
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
exports.deleteContact = async (req, res, next) => {
	try {
		Contacts.deleteOne({'_id': req.params.id}, () =>{});
		res.status(204).end();
	} catch {
		next(err);
	}
}

// module.exports = contacts;