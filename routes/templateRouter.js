const express = require("express");
const controller = require("../controllers/templateController");
const router = express.Router();

/*****************Hong**********************/
const contacts = require("./contacts");
/*******************************************/

router.get("/", controller.getTemplate);
router.post("/", controller.newTemplate);

/**************Hong*******************/
router.use("/contacts", contacts);
/*************************************/
module.exports = router;
