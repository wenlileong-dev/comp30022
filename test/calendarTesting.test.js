let chai = require("chai");
let chaiHttp = require("chai-http");
const app = require("./../index");
let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);
const api = chai.request(app).keepOpen();

describe("Calendar API Testing", () => {
  let token = "";
  before((done) => {
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

  it("test github action", (done) => {
    token.should.have.lengthOf.above(1);
    done();
  });
});
