let chai = require("chai");
let chaiHttp = require("chai-http");
const app = require("./../index");
let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);
const api = chai.request(app).keepOpen();
describe("delete event", () => {
  let eventID = "61594c6e654ba600167cb694";
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
