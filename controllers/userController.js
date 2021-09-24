const bcrypt = require("bcrypt");
var User = require("../models/user");
// register user acc
exports.userPostRegister = async (req, res) => {
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
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            phoneNumber: req.body.phoneNumber,
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save().then((user) => {
                // return register information in json format
                const token = user.generateAuthToken();
                res.cookie("token", token);
                res.status(200).json({
                  success: true,
                  user: {
                    email: user.email,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phonenumber,
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
    res.status(200).json({ success: false, error: "Database update failed" });
  }
};

exports.userPostLogin = async (req, res) => {
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
            const token = user.generateAuthToken();
            res.cookie("token", token);
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
    res.status(200).json({ success: false, error: "Data find failed" });
  }
};

exports.userLogout = async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ status: 200 });
};

exports.userPostUpdate = async (req, res) => {
  try {
    let reg = /^(?=\S*[a-z])(?=\S*\d)\S{8,}$/;
    if (reg.test(req.body.password)) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          Customer.findOne(
            { email: req.body.email },
            function (err, duplicateCustomer) {
              if (duplicateCustomer) {
                if (duplicateCustomer._id != req.params.id) {
                  console.log(duplicateCustomer._id);
                  console.log(req.params.id);
                  res.status(409).json({
                    success: false,
                    message:
                      "another customer has already registered that email",
                  });
                }
              } else {
                Customer.findOneAndUpdate(
                  { _id: req.params.id },
                  // update information
                  {
                    givenName: req.body.givenName,
                    familyName: req.body.familyName,
                    password: hash,
                  },
                  { new: true },
                  // whether the update is successful or not
                  function (err, updateCustomer) {
                    if (err) {
                      res.status(404).json({
                        success: false,
                        message: "customer email does not exist",
                      });
                    } else {
                      res.status(200).json({
                        success: true,
                        updateCustomer: updateCustomer,
                      });
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
