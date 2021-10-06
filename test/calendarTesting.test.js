let chai = require("chai");
let chaiHttp = require("chai-http");
const app = require("./../index");
let should = chai.should();
let expect = chai.expect;
chai.use(chaiHttp);
const api = chai.request(app).keepOpen();

//npm run test:awesome

describe("Copy of Group API Testing", () => {
  let token = "";
  let groupID = "";
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
        userID = res.body.user.id;
        console.log(userID);
        done();
      });
  });

  afterEach((done) => {
    token = "";
    done();
  });

  // 1. get groups
  describe("get groups", () => {
    it("with valid token", (done) => {
      api
        .get("/group")
        .set("Cookie", `token=${token}`)
        .end((err, res) => {
          // res.should.have.status(200);
          res.body.success.should.be.eql(true);
          res.body.allGroups.should.be.a("array");
          done();
        });
    });
  });

  // 2. get groups and contacts
  describe("get all groups", () => {
    it("with valid token", (done) => {
      api
        .get("/group/all")
        .set("Cookie", `token=${token}`)
        .end((err, res) => {
          // res.should.have.status(200);
          res.body.status.should.be.eql(200);
          res.body.allGroups.should.be.a("array");
          done();
        });
    });
  });

  // 3. add new group
  describe("Add Group", () => {
    it("add group with valid input", (done) => {
      let testInput = {
        groupName: "group test",
        contacts: [],
        isTop: false,
        isDefault: false,
      };
      api
        .post("/group/create")
        .set("Cookie", `token=${token}`)
        .send(testInput)
        .end((err, res) => {
          res.body.success.should.be.eql(true);
          res.body.order.should.be.a("object");
          groupID = res.body.order._id;
          done();
        });
    });
  });

  // 4. update group
  describe("update group", () => {
    it("update group with valid input", (done) => {
      let testInput = {
        groupName: "group zz",
        contacts: [],
        isTop: false,
        isDefault: false,
      };
      api
        .post(`/group/update/${groupID}`)
        .set("Cookie", `token=${token}`)
        .send(testInput)
        .end((err, res) => {
          res.body.success.should.be.eql(true);
          res.body.info.should.be.a("object");
          done();
        });
    });
  });

  // 5. top group
  describe("top group", () => {
    it("top group with valid input", (done) => {
      let testInput = {
        isTop: true,
        id: groupID,
      };
      api
        .post(`/group/top`)
        .set("Cookie", `token=${token}`)
        .send(testInput)
        .end((err, res) => {
          res.body.group.isTop.should.be.eql(true);
          done();
        });
    });
  });

  // 6. create default group
  describe("create default group", () => {
    it("create default group with valid input", (done) => {
      api
        .post(`/group/default/${userID}`)
        .set("Cookie", `token=${token}`)
        .end((err, res) => {
          res.body.success.should.be.eql(true);
          done();
        });
    });
  });

  // 7. delete group
  describe("delete group", () => {
    it("delete group with valid groupID", (done) => {
      let testInput = {
        id: groupID,
      };
      api
        .post(`/group/delete`)
        .set("Cookie", `token=${token}`)
        .send(testInput)
        .end((err, res) => {
          res.body.status.should.be.eql(200);
          res.body.msg.should.be.a("array");
          done();
        });
    });
  });
});
