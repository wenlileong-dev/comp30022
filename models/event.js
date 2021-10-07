const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    time: { type: Date, required: true },
    people: { type: [mongoose.Schema.Types.Mixed] },
    eventType: { type: String, enum: ["Online", "Offline"], required: true },
    location: { type: String, required: true },
    meetingNotes: { type: String, default: "" },
    meetingLink: { type: String },
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
