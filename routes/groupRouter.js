const express = require("express");
const groupController = require("../controllers/groupController");
const router = express.Router();

// get list of the group
router.get("/", groupController.displayGroup);
// post new group
router.post("/create", groupController.newGroup);
// update the order
router.post('/update/:id',groupController.updateInformation);
//
router.post('/delete',groupController.deleteGroup);

router.get('/all',groupController.getAllGroup);

module.exports = router;
