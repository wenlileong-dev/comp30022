const mongoose = require("mongoose");
const User = require("./../models/userModel");

exports.checkAuth = async (req, res, next) => {
  let cookie = req.cookies["authid"];
  if (!cookie) {
    return res.json({ status: 401, msg: "Please Signup/Login" });
  }
  next();
};

exports.getMyTime = async (req, res) => {
  let cookie = req.cookies["authid"];
  const user = await User.findOne({ authid: cookie });
  if (user) {
    res.json({ status: 200, data: user });
  } else {
    res.json({ status: 401, msg: "Please Login again" });
  }
};
