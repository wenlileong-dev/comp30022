const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  groupName: { type: String },
  // contactNumber: { type: Number },
  contacts: {
    type: Array,
    default: [],
  },
  isTop: { type: Boolean },
  isDefault: { type: Boolean },
  userID: { type: mongoose.Schema.ObjectId, ref: "User" },
});

//const Group = mongoose.model("Group", groupSchema);
module.exports = groupSchema;
