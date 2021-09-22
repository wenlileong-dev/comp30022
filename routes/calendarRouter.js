const express = require("express");
const controller = require("../controllers/calendarController");
const router = express.Router();

router.post("/", controller.addEvent);
router.get("/:month/:year", controller.getEvents);
router.put("/", controller.updateEvent);
router.delete("/:id", controller.deleteEvent);

module.exports = router;
