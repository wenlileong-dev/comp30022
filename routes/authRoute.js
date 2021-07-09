const express = require("express");
const controller = require("../controllers/authController");
const router = express.Router();

router.post("/login", controller.login);
router.post("/signup", controller.signup);
router.get("/logout", controller.logout);

module.exports = router;
