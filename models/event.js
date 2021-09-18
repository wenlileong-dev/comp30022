const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
    time: { type: String },
    people: { type: [String] },
    eventType: { type: String, enum: ["Online", "Offline"] },
    location: { type: String },
    meetingNotes: { type: String, default: "" },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

eventSchema.virtual("timeInNumbers").get(function () {
  let arr = this.time.split(":");
  let hour = parseInt(arr[0]);
  let minute = parseInt(arr[1]);
  return hour * 60 + minute;
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
