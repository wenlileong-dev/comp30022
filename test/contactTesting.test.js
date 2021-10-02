const expect = require('chai').expect;
const got = require('got');
const app = require('../index');

const baseUrl = 'http://localhost:5000/api/contacts/';
const testGroupID = '61569f084cd18a3ec4bb4a2c';
let testID = '';

const testContact = {
	contact: {
		firstName: 'ContactTest',
		lastName: 'ContactTest',
		gender: 'male',
		email: 'testContact@mail.com',
		phone: '00000000',
		department:'',
		address:'',
		reamrk:'',
		groupID: testGroupID
	}
}

const updatedContact = {
	contact: {
		firstName: 'ContactTest2',
		lastName: 'ContactTest2',
		gender: 'female',
		email: 'testContact@mail.com',
		phone: '00000000',
		department:'test',
		address:'test',
		reamrk:'test',
		groupID: testGroupID
	}
}

describe('Contact API Testing', () => {
	// Set authrization information
	let token = "";
  	before(done => {
    	let user = {
      		email: "test@mail.com",
      		password: "123qwert",
    	}

      	got({
      		method: 'POST',
      		headers: {'content-type': 'application/json'},
      		url: 'http://localhost:5000/user/login',
      		body: user,
      		json: true
      	}).then(response => {
        	expect(response.statusCode).to.equal(200);
        	expect(response.body.success).to.equal(true);
        	token = response.body.token;
        	done();
        }).catch(error => {
        	console.log('error');
        	done(err);
      	});
  	});

  	// Addition Function Test
	describe('New Contact Addition Test', () => {
		it('Add a new contact successfully', done => {
			got({
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					'cookie': `token=${token}`
				},
            	url: baseUrl + 'add-contact',
            	body: testContact,
            	json: true
			}).then(response => {
				expect(response.statusCode).to.equal(201);
				// console.log('body', response.body);
				testID = response.body.newContact._id;
				done();
			}).catch(error => {
				done(error);
			});
		});
	});

	// Update Function Test
	describe('Contact Information Update Test', () => {
		it('Update contact information successfully', done => {
			console.log('testID', testID);
			got({
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
					'cookie': `token=${token}`
				},
            	url: baseUrl + `info/${testID}`,
            	body: updatedContact,
            	json: true
			}).then(response => {
				expect(response.statusCode).to.equal(201);
				done();
			}).catch(error => {
				done(error);
			});
		});
	});

	// Deletion Function Test
	describe('Contact Information Deletion Test', () => {
		it('Delete a contact successfully', done => {
			got({
				method: 'DELETE',
				headers: {
					'content-type': 'application/json',
					'cookie': `token=${token}`
				},
            	url: baseUrl + `info/${testID}`,
			}).then(response => {
				expect(response.statusCode).to.equal(204);
				done();
			}).catch(error => {
				done(error);
			});
		});
	});

	// Information Request Test
	describe('All Contacts Request Test', () => {
		it('Fetch all contacts for one account successfully', done => {
			got({
				method: 'GET',
				headers: {
					'content-type': 'application/json',
					'cookie': `token=${token}`
				},
            	url: baseUrl + 'allContact',
			}).then(response => {
				const result = JSON.parse(response.body);
				expect(response.statusCode).to.equal(200);
				expect(result.status).to.equal(200);
				expect(result.success).to.equal(true);
				done();
			}).catch(error => {
				done(error);
			});
		});
	});
});