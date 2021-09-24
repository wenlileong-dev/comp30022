const express = require("express");
const controller = require("../controllers/calendarController");
const { authUser } = require("./../controllers/authUser");
const router = express.Router();

router.post("/", authUser, controller.addEvent);
router.get("/:month/:year", authUser, controller.getEvents);
router.put("/", authUser, controller.updateEvent);
router.delete("/:id", controller.deleteEvent);

module.exports = router;
