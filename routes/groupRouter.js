const express = require("express");
const groupController = require("../controllers/groupController");
const router = express.Router();
const {authUser} = require("./../controllers/authUser");

// get list of the group
router.get("/", authUser, groupController.displayGroup);
// post new group
router.post("/create", authUser, groupController.newGroup);
// update the order
router.post('/update/:id',authUser, groupController.updateInformation);
//
router.post('/delete',authUser, groupController.deleteGroup);

router.get('/all',authUser, groupController.getAllGroup);

router.post('/top',authUser, groupController.topGroup);

router.post('/default/:id', authUser, groupController.newDefaultGroup);

module.exports = router;
