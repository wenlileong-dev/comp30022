const {body} = require('express-validator');
const validate = require('./validation');

// Verify new contact information
exports.addContact = validate([
	body('contact.firstName')
		.trim()
		.notEmpty().withMessage('first name cannot be empty'),
	body('contact.lastName')
		.trim()
		.notEmpty().withMessage('last name cannot be empty'),
	body('contact.gender').notEmpty().withMessage('gender cannot be empty'),
	body('contact.phone')
		.notEmpty().withMessage('phone number cannot be empty')
		.bail()
		.custom(value => {
			if (isNaN(value)) {
				return Promise.reject();
			}
			return Promise.resolve();
		}).withMessage('phone number must consist of digits'),
	body('contact.email')
		.notEmpty().withMessage('email cannot be empty')
		.bail()
		.isEmail().withMessage('must be a valid email format'),//check email format
	body('contact.department')
		.if(body('contact.department').notEmpty())
		.trim()
		.notEmpty().withMessage('department cannot be blank'),
	body('contact.address')
		.if(body('contact.address').notEmpty())
		.trim()
		.notEmpty().withMessage('address cannot be blank')
])

// Verify updated contact information
exports.updateInformation = validate([
	body('contact.firstName')
		.trim()
		.notEmpty().withMessage('first name cannot be empty'),
	body('contact.lastName')
		.trim()
		.notEmpty().withMessage('last name cannot be empty'),
	body('contact.gender')
		.notEmpty().withMessage('gender cannot be empty'),
	body('contact.phone')
		.notEmpty().withMessage('phone number cannot be empty')
		.bail()
		.custom(value => {
			if (isNaN(value)) {
				return Promise.reject();
			}
			return Promise.resolve();
		}).withMessage('phone number must consist of digits'),
	body('contact.email')
		.notEmpty().withMessage('email cannot be empty')
		.bail()
		.isEmail().withMessage('must be a valid email format'),//check email format
	body('contact.department')
		.if(body('contact.department').notEmpty())
		.trim()
		.notEmpty().withMessage('department cannot be blank'),
	body('contact.address')
		.if(body('contact.address').notEmpty())
		.trim()
		.notEmpty().withMessage('address cannot be blank')
])