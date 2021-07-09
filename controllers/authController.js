const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const User = require("./../models/userModel");
const saltRounds = 10;

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let authString = nanoid(10);
        user.authid = authString;
        user.save((err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.cookie("authid", authString, {
              maxAge: 9000000000,
              httpOnly: true,
              secure: false,
            });
            res.json({ status: 200, msg: "Login Successful" });
          }
        });
      } else {
        res.json({ status: 401, msg: "password not match with username" });
      }
    });
  } else {
    res.json({ status: 401, msg: "username not defined" });
  }
};

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  let authString = nanoid(10);
  bcrypt.hash(password, saltRounds, async function (err, hash) {
    try {
      const newUser = new User({
        username,
        password: hash,
        authid: authString,
      });
      const saveUser = await newUser.save();
      res.cookie("authid", authString, {
        maxAge: 9000000000,
        httpOnly: true,
        secure: false,
      });
      res.json({ status: 200, msg: "Signup Successful" });
    } catch (error) {
      res.json({ status: 401, msg: "invalid input" });
    }
  });
};

exports.logout = async (req, res) => {
  res.clearCookie("authid");
  res.json({ status: 200, msg: "Logout User" });
};
