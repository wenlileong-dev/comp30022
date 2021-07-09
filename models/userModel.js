const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    authid: { type: String },
    workRatio: { type: Number, default: 1 },
    playRatio: { type: Number, default: 1 },
    workTime: { type: Number, default: 0 },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
userSchema.virtual("playTime").get(function () {
  return (this.workTime / this.workRatio) * this.playRatio;
});
const User = mongoose.model("User", userSchema);
module.exports = User;
