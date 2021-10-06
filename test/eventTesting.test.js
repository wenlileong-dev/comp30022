let chai = require("chai");
let chaiHttp = require("chai-http");
const app = require("./../index");
let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);
const api = chai.request(app).keepOpen();

//npm run test:awesome

describe("Event API Testing", () => {
  let token = "";
  let eventID = "";
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

  describe("get events", () => {
    it("with valid token", (done) => {
      api
        .get("/api/calendar/8/2021")
        .set("Cookie", `token=${token}`)
        .end((err, res) => {
          // res.should.have.status(200);
          res.body.status.should.be.eql(200);
          res.body.data.should.be.a("array");
          done();
        });
    });

    it("without token", (done) => {
      api.get("/api/calendar/8/2021").end((err, res) => {
        // res.should.have.status(200);
        res.body.status.should.be.eql(401);
        res.body.errorMsg.should.be.eql("Access denied...No token provided...");
        done();
      });
    });
  });

  describe("Add Event", () => {
    it("add event with valid input", (done) => {
      let testInput = {
        title: "testing api",
        description: "description for testing api",
        date: "2021-9-30",
        time: "2021-09-30T13:49:51.141Z",
        people: "Joe,John",
        eventType: "Online",
        location: "team",
      };
      api
        .post("/api/calendar")
        .set("Cookie", `token=${token}`)
        .send(testInput)
        .end((err, res) => {
          res.body.status.should.be.eql(200);
          res.body.data.should.be.a("object");
          res.body.data.title.should.be.eql(testInput.title);
          eventID = res.body.data._id;
          done();
        });
    });

    it("add event without title", (done) => {
      let testInput = {
        description: "description for testing api",
        date: "2021-9-30",
        time: "2021-09-30T13:49:51.141Z",
        people: "Joe,John",
        eventType: "Online",
        location: "team",
      };
      api
        .post("/api/calendar")
        .set("Cookie", `token=${token}`)
        .send(testInput)
        .end((err, res) => {
          res.body.status.should.be.eql(400);
          res.body.errorMsg.should.be.eql("Bad Request - invalid input");
          done();
        });
    });
  });

  describe("update event", () => {
    it("update event with valid input", (done) => {
      let testInput = {
        title: "update testing api",
        description: "description for update testing api",
        date: "2021-9-30",
        time: "2021-09-30T13:49:51.141Z",
        people: "Joe,John",
        eventType: "Online",
        location: "team",
        eventID: eventID,
      };
      api
        .put("/api/calendar")
        .set("Cookie", `token=${token}`)
        .send(testInput)
        .end((err, res) => {
          res.body.status.should.be.eql(200);
          res.body.data.should.be.a("object");
          res.body.data.title.should.be.eql(testInput.title);
          done();
        });
    });

    it("update event without title", (done) => {
      let testInput = {
        description: "description for update testing api",
        date: "2021-9-30",
        time: "2021-09-30T13:49:51.141Z",
        people: "Joe,John",
        eventType: "Online",
        location: "team",
        eventID: eventID,
      };
      api
        .put("/api/calendar")
        .set("Cookie", `token=${token}`)
        .send(testInput)
        .end((err, res) => {
          res.body.status.should.be.eql(400);
          res.body.errorMsg.should.be.eql("Bad Request - invalid input");
          done();
        });
    });
  });

  describe("delete event", () => {
    it("delete event with valid eventID", (done) => {
      api
        .delete(`/api/calendar/${eventID}`)
        .set("Cookie", `token=${token}`)
        .end((err, res) => {
          res.body.status.should.be.eql(200);
          res.body.data.should.be.a("object");
          res.body.data._id.should.be.eql(eventID);
          done();
        });
    });

    it("delete event with invalid eventID", (done) => {
      api
        .delete("/api/calendar/xxxxx")
        .set("Cookie", `token=${token}`)
        .end((err, res) => {
          res.body.status.should.be.eql(400);
          res.body.errorMsg.should.be.eql("Bad Request - Invalid eventID");
          done();
        });
    });
  });
});

//   describe("auth User", () => {
//     let user = {
//       email: "test@mail.com",
//       password: "123qwert",
//     };
//     it("Login User", (done) => {
//       api
//         .post("/user/login")
//         .send(user)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.success.should.be.eql(true);
//           token = res.body.token;
//           done();
//         });
//     });
//   });
