const express = require("express");
const router = express.Router();
const { authUser } = require("./../controllers/authUser");
var userController = require("../controllers/userController");

// post to localhost7000/user/register
router.post("/register", userController.userPostRegister);

// post request for login
router.post("/login", userController.userPostLogin);
router.post("/logout", userController.userLogout);

router.post("/update/:id", userController.userPostUpdate);
router.delete("/deleteUser/:email", userController.deleteUser);
// view detail of snack
router.get("/", authUser, userController.userGetDetail);

router.post("/sendVerifyEmail", authUser, userController.sendVerifyEmail);
router.put("/api/verify/:userID/:emailToken", userController.verifyUserEmail);
module.exports = router;
