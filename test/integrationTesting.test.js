const expect = require('chai').expect;
const request = require('request');
const app = require('../index');

const baseUrl = "http://localhost:5000/user"


const testUserUpdate = {
    validBody: {
	    "password": "Hh3502251",
	    "firstName": "J123",
	    "lastName": "X123",
	    "phoneNumber": "011121"
    }
}

const testUserId = "614eca3f7677f9a310f2b469"

describe("user integration tests", () => {

    it('should successfully update user details', function (done) {
        request.post(
            {
                headers: {'content-type': 'application/json'},
                url: baseUrl + '/update/' + testUserId,
                body: testUserUpdate.validBody,
                json: true,
            },
            function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body.success).to.equal(true);
                if(error) done(error);
                else done();
            }
        );
    })

})

// Group test
// const groupUrl = "http://localhost:5000/group"

// const testGroupUpdate = {
//     validBody: {
// 	    "groupName": "friend",
// 	    "contacts": [],
// 	    "isTop": false,
// 	    "isDefault": false
//     }
// }
// //knkn
// const testGroupId = "61535bc37c711676c89c8f38"

// describe("group integration tests", () => {

//     it('should successfully update group details', function (done) {
//         request.post(
//             {
//                 headers: {'content-type': 'application/json'},
//                 url: groupUrl + '/update/' + testGroupId,
//                 body: testGroupUpdate.validBody,
//                 json: true,
//             },
//             function (error, response, body) {
//                 expect(response.statusCode).to.equal(200);
//                 expect(body.success).to.equal(true);
//                 if(error) done(error);
//                 else done();
//             }
//         );
//     })

// })
