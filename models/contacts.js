const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},

	lastName: {
		type: String,
		required: true
	},

	gender: {
		type:String,
		required: true
	},

	email: {
		type: String,
		required: true
	},

	phone: {
		type: String, //JSON value cannot start with 0
		required: true
	},

	department: {
		type: String
	},

	address: {
		type: String
	},

	remark: {
		type: String
	},
	userID: { type: mongoose.Schema.ObjectId, ref: "User" },
	groupID: { type: mongoose.Schema.ObjectId, ref: "group" },
	contactTime: {
		type: Date,
		default:Date.now
	}
})

module.exports = contactSchema