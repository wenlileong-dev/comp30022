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
		.if(body('contact.email').exists())
		.notEmpty().withMessage('email cannot be empty')
		.bail()
		.isEmail().withMessage('must be a valid email format'),//check email format
	body('contact.department')
		.if(body('contact.department').exists())
		.trim()
		.notEmpty().withMessage('department cannot be empty'),
	body('contact.address')
		.if(body('contact.address').exists())
		.trim()
		.notEmpty().withMessage('address cannot be empty')
])

// Verify updated contact information
exports.updateInformation = validate([
	body('contact.firstName')
		.if(body('contact.firstName').exists())
		.trim()
		.notEmpty().withMessage('first name cannot be empty'),
	body('contact.lastName')
		.if(body('contact.lastName').exists())
		.trim()
		.notEmpty().withMessage('last name cannot be empty'),
	body('contact.gender')
		.if(body('contact.gender').exists())
		.notEmpty().withMessage('gender cannot be empty'),
	body('contact.phone')
		.if(body('contact.phone').exists())
		.notEmpty().withMessage('phone number cannot be empty')
		.bail()
		.custom(value => {
			if (isNaN(value)) {
				return Promise.reject();
			}
			return Promise.resolve();
		}).withMessage('phone number must consist of digits'),
	body('contact.email')
		.if(body('contact.email').exists())
		.notEmpty().withMessage('email cannot be empty')
		.bail()
		.isEmail().withMessage('must be a valid email format'),//check email format
	body('contact.department')
		.if(body('contact.department').exists())
		.trim()
		.notEmpty().withMessage('department cannot be empty'),
	body('contact.address')
		.if(body('contact.address').exists())
		.trim()
		.notEmpty().withMessage('address cannot be empty')
])