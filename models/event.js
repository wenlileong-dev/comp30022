const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date },
  time: { type: String },
  people: { type: [String] },
  eventType: { type: String, enum: ["online", "face-to-face"] },
  location: { type: String },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
