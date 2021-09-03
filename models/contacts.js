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
		type: String
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
		type: Boolean,
		default: false
	}
})

module.exports = contactSchema