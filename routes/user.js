const express = require("express");
const router = express.Router();

var userController = require("../controllers/userController");

// post to localhost7000/user/register
router.post("/register", userController.userPostRegister);

// post request for login
router.post("/login", userController.userPostLogin);
router.post("/logout", userController.userLogout);

module.exports = router;
