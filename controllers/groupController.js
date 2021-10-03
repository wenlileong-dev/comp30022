const { Groups, Contacts } = require("./../models/db.js");

// get all group
exports.displayGroup = async (req, res, next) => {
  try {
    const allGroups = await Groups.find({});
    res.status(200).json({
      success: true,
      allGroups: allGroups,
    });
  } catch (err) {
    next(err);
  }
};

// create a new group
exports.newGroup = async (req, res) => {
  try {
    const group = new Groups({
      groupName: req.body.groupName,
      contacts: req.body.contacts,
      isTop: req.body.isTop,
      userID: req.user._id,
      isDefault: false,
    });
    await group.save((err, createdGroup) => {
      if (err) {
        res.status(400).json({ success: false, err: err });
      } else {
        res.status(200).json({ success: true, order: createdGroup });
      }
    });
  } catch {
    res.status(400);
    return res.send("Database update failed");
  }
};

exports.updateInformation = async (req, res, next) => {
  try {
    const newInfo = req.body;
    // console.log(newInfo);
    // console.log(newInfo);
    Groups.updateOne({ _id: req.params.id }, { $set: newInfo }, () => {});
    const info = await Groups.findById(req.params.id);
    // console.log("update?");
    res.status(200).json({ success: true, info: info });
  } catch (err) {
    next(err);
  }
};

// exports.deleteGroup = async (req, res) => {
//     let groupID = req.body.id;
//     const oldGroup = Groups.findById(groupID);
//     await Groups.findByIdAndDelete(groupID);
//     res.json({ status:200, msg: "group deleted"});
// }

exports.deleteGroup = async (req, res) => {
  let groupID = req.body.id;
  let defaultGroup = await Groups.findOne({
    userID: req.user._id,
    isDefault: true,
  });
  // console.log(defaultGroup);
  let oldGroup = await Groups.findById(groupID);
  const moveContact = defaultGroup.contacts.concat(oldGroup.contacts);
  defaultGroup.contacts = moveContact;
  res.json({ status: 200, msg: moveContact });

  try {
    Groups.updateOne(
      { _id: defaultGroup._id },
      { $set: defaultGroup },
      () => {}
    );
  } catch (e) {
    res.json({ errorMsg: "database error" });
  }

  await Groups.findByIdAndDelete(groupID);
  res.json({ status: 200, msg: "group deleted" });
};

exports.getAllGroup = async (req, res) => {
  let userID = req.user._id;
  try {
    let allGroups = await Groups.find({ userID: userID });
    let allContacts = [];
    for (let i = 0; i < allGroups.length; i++) {
      let groupContactId = allGroups[i].contacts;
      let groupContacts = [];
      for (let j = 0; j < groupContactId.length; j++) {
        let contact = await Contacts.findById(groupContactId[j]);
        groupContacts.push(contact);
      }
      allContacts.push(groupContacts);
    }
    res.json({ status: 200, allGroups, allContacts });
  } catch (error) {
    res.json({ errorMsg: "database error" });
  }
};

exports.topGroup = async (req, res) => {
  let groupID = req.body.id;
  let group = await Groups.findById(groupID);
  group.isTop = !group.isTop;
  res.json({ group });

  try {
    Groups.updateOne({ _id: req.body.id }, { $set: group }, () => {});
  } catch (e) {
    res.json({ errorMsg: "database error" });
  }
};

exports.newDefaultGroup = async (req, res) => {
  try {
    const group = new Groups({
      groupName: "Default Group",
      contacts: [],
      isTop: true,
      userID: req.params.id,
      isDefault: true,
    });
    await group.save((err, createdGroup) => {
      if (err) {
        res.status(400).json({ success: false, err: err });
      } else {
        // console.log("default group");
        // console.log(createdGroup);
        res.status(200).json({ success: true, order: createdGroup });
      }
    });
  } catch {
    res.status(400);
    return res.send("Database update failed");
  }
};
