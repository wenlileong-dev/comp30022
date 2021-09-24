const express = require("express");
const controller = require("../controllers/templateController");
const router = express.Router();

router.get("/", controller.getTemplate);
router.post("/", controller.newTemplate);

module.exports = router;
