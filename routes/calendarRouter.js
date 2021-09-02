const express = require("express");
const controller = require("../controllers/calendarController");
const router = express.Router();

router.post("/", controller.addEvent);
router.get("/:month/:year", controller.getEvents);

module.exports = router;
