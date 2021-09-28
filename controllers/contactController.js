const {Contacts, Groups} = require('../models/db.js')

const group = require("./groupController");

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
		res.json({
			status:200
		});
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
		const groupSelected = new Groups (req.body.group);
		groupSelected.contacts.push(newContact._id+'');
		console.log(groupSelected);
		Groups.updateOne({'_id': groupSelected._id}, 
			{$set: {contacts: groupSelected.contacts}}, () => {});

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
//all contacts for the one account
exports.getAllContacts = async (req, res) => {
	let userID = req.user._id;
	// let month = parseInt(req.params.month);
	// let year = parseInt(req.params.year);
	// const firstDay = new Date(year, month, 1);
	// const lastDay = new Date(year, month + 1, 0);
  	let result=[];
	//get the events that occur in the given month

	let allContact = await Contacts.find({
	  userID: userID
	}).sort({contactTime: -1});
	console.log(userID)
	// let daysInMonth = getDaysInMonth(new Date(year, month));
	if(allContact.length>5){
		result=allContact.slice(0,5)
		res.json({ status: 200, data: result });
	}else{
		result=allContact
		res.json({ status: 200, data: result });
	}
	
	//add the event to the day respectively
	// for (let i = 0; i < monthEvents.length; i++) {
	//   let eventDay = monthEvents[i].date.getDate();
	//   result[eventDay - 1].push(monthEvents[i]);
	// }
  
	//sort the event by time for each day
	// for (let j = 0; j < result.length; j++) {
	//   if (result[j].length > 1) {
	// 	result[j].sort(compare);
	//   }
	// }
	// res.json({ status: 200, data: result });
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