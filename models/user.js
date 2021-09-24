const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  // attributes of user
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "15m" }
  );
  return token;
};

module.exports = mongoose.model("User", UserSchema);
