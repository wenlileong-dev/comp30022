const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
});

const Template = mongoose.model("Template", templateSchema);
module.exports = Template;
