const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
    time: { type: Date },
    people: { type: [String] },
    eventType: { type: String, enum: ["Online", "Offline"] },
    location: { type: String },
    meetingNotes: { type: String, default: "" },
    userID: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

eventSchema.virtual("timeInNumbers").get(function () {
  let myTime = new Date(this.time);
  let hour = myTime.getHours();
  let minute = myTime.getMinutes();
  return hour * 60 + minute;
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
