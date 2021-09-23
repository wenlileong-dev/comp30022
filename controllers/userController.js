const bcrypt = require("bcrypt");
var User = require("../models/user");
// register user acc
const userPostRegister = async (req, res) => {
  try {
    User.findOne({ email: req.body.email }).then((user) => {
      // if email already used, error
      if (user) {
        res
          .status(200)
          .json({ success: false, error: "Email already registered" });
      } else {
        let reg = /^(?=\S*[a-z])(?=\S*\d)\S{8,}$/;
        if (reg.test(req.body.password)) {
          // create new user acc
          const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save().then((user) => {
                // return register information in json format
                res.status(200).json({
                  success: true,
                  user: {
                    email: user.email,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                  },
                });
              });
            });
          });
        } else {
          res
            .status(200)
            .json({ success: false, error: "Password not valid!" });
        }
      }
    });
  } catch {
    res.status(200).json({ error: "Database update failed" });
  }
};

const userPostLogin = async (req, res) => {
  try {
    User.findOne({
      email: req.body.email,
    }).then((user) => {
      // if email not found
      if (!user) {
        res.status(200).json({ success: false, error: "Email not found!" });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          // if the password matches the email, login successfully and show user information
          if (isMatch) {
            res.status(200).json({
              success: true,
              user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
              },
            });
          } else {
            res
              .status(200)
              .json({ success: false, error: "Password is incorrect" });
          }
        });
      }
    });
  } catch {
    res.status(200).json({ error: "Data find failed" });
  }
};

const userPostUpdate = async (req, res) => {
  try {
    let reg = /^(?=\S*[a-z])(?=\S*\d)\S{8,}$/;
    if (reg.test(req.body.password)) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          User.findOne(
            { email: req.body.email },
            function (err, duplicateUser) {
              if (duplicateUser) {
                if (duplicateUser._id != req.params.id) {
                  console.log(duplicateUser._id);
                  console.log(req.params.id);
                  res
                    .status(409)
                    .json({
                      success: false,
                      message: "another User has already registered that email",
                    });
                }
              } else {
                User.findOneAndUpdate(
                  { _id: req.params.id },
                  // update information
                  {
                    givenName: req.body.givenName,
                    familyName: req.body.familyName,
                    phoneNumber: req.body.phoneNumber,
                    password: hash,
                  },
                  { new: true },
                  // whether the update is successful or not
                  function (err, updateUser) {
                    if (err) {
                      res
                        .status(404)
                        .json({
                          success: false,
                          message: "User account does not exist",
                        });
                    } else {
                      res
                        .status(200)
                        .json({ success: true, updateUser: updateUser });
                    }
                  }
                );
              }
            }
          );
        });
      });
    } else {
      res
        .status(200)
        .json({ success: false, error: "New password not valid!" });
    }
  } catch {
    res.status(400);
    return res.send("Database update failed");
  }
};

module.exports = {
  userPostLogin,
  userPostRegister,
  userPostUpdate,
};
