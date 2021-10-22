const expect = require("chai").expect;
const request = require("request");

const testAllContacts = [
  {
    name: "contact1",
    contactTime: 2021 - 09 - 21,
    userID: "614d7378de23b63284235ab6",
  },
  {
    name: "contact2",
    contactTime: 2021 - 09 - 22,
    userID: "614d7378de23b63284235ab6",
  },
  {
    name: "contact3",
    contactTime: 2021 - 09 - 23,
    userID: "614d7378de23b63284235ab6",
  },
  {
    name: "contact4",
    contactTime: 2021 - 09 - 24,
    userID: "614d7378de23b63284235ab6",
  },
  { name: "contact5", contactTime: 2021 - 09 - 25, userID: "1" },
  { name: "contact6", contactTime: 2021 - 09 - 26, userID: "2" },
  { name: "contact7", contactTime: 2021 - 09 - 27, userID: "3" },
];

const testContactsResult = [
  { name: "contact4", contactTime: 2021 - 09 - 24 },
  { name: "contact3", contactTime: 2021 - 09 - 23 },
  { name: "contact2", contactTime: 2021 - 09 - 22 },
  { name: "contact1", contactTime: 2021 - 09 - 21 },
];

describe("unit tests", () => {
  it("should return recent contacts", function (done) {
    let userID = "614d7378de23b63284235ab6";
    let result = [];
    for (i = 0; i < testAllContacts.length; i++) {
      if (testAllContacts[i].userID === userID) {
        result.push({
          name: testAllContacts[i].name,
          contactTime: testAllContacts[i].contactTime,
        });
      }
    }
    if (result.length > 5) {
      result = result
        .sort(({ contactTime: a }, { contactTime: b }) => a - b)
        .slice(0, 5);
    } else {
      result = result.sort(({ contactTime: a }, { contactTime: b }) => a - b);
    }
    expect(result).to.eql(testContactsResult);
    done();
  });
});
