const expect = require("chai").expect;
const request = require("request");
const app = require("../index");
let chaiHttp = require("chai-http");
// const app = require("./../index");
const should = require("chai").should();
// let expect = chai.expect;
require("chai").use(chaiHttp);
const api = require("chai").request(app).keepOpen();

const userUrl = "http://localhost:5000/user";
//user post update
const testUserUpdate = {
  validBody: {
    password: "Hh3502251",
    firstName: "J123",
    lastName: "X123",
    phoneNumber: "011121",
  },
};

const testUserId = "614eca3f7677f9a310f2b469";

describe("userPostUpdate integration tests", () => {
  it("should successfully update user details", function (done) {
    request.post(
      {
        headers: { "content-type": "application/json" },
        url: userUrl + "/update/" + testUserId,
        body: testUserUpdate.validBody,
        json: true,
      },
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(body.success).to.equal(true);
        if (error) done(error);
        else done();
      }
    );
  });
});

//user Post Login
const testUserLogin = {
  validBody: {
    email: "test@mail.com",
    password: "123qwert",
  },
};

describe("userPostLogin integration tests", () => {
  it("should successfully login user account", function (done) {
    request.post(
      {
        headers: { "content-type": "application/json" },
        url: userUrl + "/login",
        body: testUserLogin.validBody,
        json: true,
      },
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(body.success).to.equal(true);
        if (error) done(error);
        else done();
      }
    );
  });
});

//user Post Register

// its correct to fail this test because the email already exists in database
// after the first test is true
const testUserRegister = {
  validBody: {
    email: "123456789@mail.com",
    password: "Hh3502251",
    firstName: "J1234",
    lastName: "X1234",
    phoneNumber: "011121222",
  },
};

describe("userPostRegister integration tests", () => {
  let userID = "";
  it("should successfully register user account", function (done) {
    request.post(
      {
        headers: { "content-type": "application/json" },
        url: userUrl + "/register",
        body: testUserRegister.validBody,
        json: true,
      },
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(body.success).to.equal(true);
        userID = body.user.userID;
        if (error) done(error);
        else done();
      }
    );
  });

  it("should successfully delete the registered user account", function (done) {
    console.log(userID);
    request.delete(
      {
        headers: { "content-type": "application/json" },
        url: userUrl + `/deleteUser/${userID}`,
        body: testUserRegister.validBody,
        json: true,
      },
      function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        expect(body.success).to.equal(true);
        if (error) done(error);
        else done();
      }
    );
  });
});

describe("User API Testing with login token", () => {
  let token = "";
  let userID = "";
  beforeEach((done) => {
    let user = {
      email: "test@mail.com",
      password: "123qwert",
    };
    api
      .post("/user/login")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        token = res.body.token;
        done();
      });
  });

  afterEach((done) => {
    token = "";
    done();
  });

  describe("get user details", () => {
    it("with valid token", (done) => {
      api
        .get("/user")
        .set("Cookie", `token=${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.success).to.equal(true);
          done();
        });
    });

    it("without token", (done) => {
      api.get("/user").end((err, res) => {
        res.body.status.should.be.eql(401);
        res.body.errorMsg.should.be.eql("Access denied...No token provided...");
        done();
      });
    });
  });

  describe("user account log out", () => {
    it("already login with valid token", (done) => {
      api
        .post("/user/logout")
        .set("Cookie", `token=""`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
