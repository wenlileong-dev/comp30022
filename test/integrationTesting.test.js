const expect = require('chai').expect;
const request = require('request');
const app = require('../index');


const userUrl = "http://localhost:5000/user"
//user post update
const testUserUpdate = {
    validBody: {
	    "password": "Hh3502251",
	    "firstName": "J123",
	    "lastName": "X123",
	    "phoneNumber": "011121"
    }
}

const testUserId = "614eca3f7677f9a310f2b469"

describe("userPostUpdate integration tests", () => {
    it('should successfully update user details', function (done) {
        request.post(
            {
                headers: {'content-type': 'application/json'},
                url: userUrl + '/update/' + testUserId,
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

//user Post Login
const testUserLogin = {
    validBody: {
        "email":"test@mail.com",
	    "password": "123qwert"
    }
}


describe("userPostLogin integration tests", () => {
    
    it('should successfully login user account', function (done) {
        request.post(
            {
                headers: {'content-type': 'application/json'},
                url: userUrl + '/login' ,
                body: testUserLogin.validBody,
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


//user Post Register

// its correct to fail this test because the email already exists in database
// after the first test is true
const testUserRegister = {
    validBody: {
            "email": "123456789@mail.com",
            "password": "Hh3502251",
            "firstName": "J1234",
            "lastName": "X1234",
            "phoneNumber": "011121222"
    }
}


describe("userPostRegister integration tests", () => {
    it('should successfully register user account', function (done) {
        request.post(
            {
                headers: {'content-type': 'application/json'},
                url: userUrl + '/register' ,
                body: testUserRegister.validBody,
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


//user Get Details
// describe("userGetDetail integration tests", () => {
//     it('should successfully get user details', function (done) {
//         request.get(
//             {
//                 // headers: {'content-type': 'application/json'},
//                 url: userUrl + '/' ,
//                 // body: testUserLogin.validBody,
//                 // json: true,
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