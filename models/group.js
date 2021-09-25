const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  groupName: { type: String },
  contactNumber: { type: Number },
  contacts: {
    type: Array,
    default: []
  }
});

//const Group = mongoose.model("Group", groupSchema);
module.exports = groupSchema;
