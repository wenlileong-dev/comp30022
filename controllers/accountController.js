var Customer = require("../models/customer");

const customerPostUpdate = async (req, res) => {
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
                  res
                    .status(409)
                    .json({
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
                      res
                        .status(404)
                        .json({
                          success: false,
                          message: "customer email does not exist",
                        });
                    } else {
                      res
                        .status(200)
                        .json({
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

module.exports = {
  customerPostUpdate,
};
