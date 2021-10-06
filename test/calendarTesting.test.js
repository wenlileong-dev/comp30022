let chai = require("chai");
let chaiHttp = require("chai-http");
const app = require("./../index");
let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);
const api = chai.request(app).keepOpen();

describe("Calendar API Testing", () => {
  let token = "";
  let eventID = "615d2649f7f9674a78d6108f";
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

  describe("delete event", () => {
    it("delete event with valid eventID", (done) => {
      api.delete(`/api/calendar/${eventID}`).end((err, res) => {
        res.body.status.should.be.eql(200);
        res.body.data.should.be.a("object");
        res.body.data._id.should.be.eql(eventID);
        done();
      });
    });

    it("delete event with invalid eventID", (done) => {
      api.delete("/api/calendar/xxxxx").end((err, res) => {
        res.body.status.should.be.eql(400);
        res.body.errorMsg.should.be.eql("Bad Request - Invalid eventID");
        done();
      });
    });
  });
});
