const { Groups } = require("./../models/db.js");

// get all group
exports.displayGroup = async (req, res, next) => {
  try {
    const allGroups = await Groups.find({});
    res.status(200).json({
      allGroups,
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
      contactNumber: req.body.contactNumber,
      contacts: req.body.contacts,
    });
    group.save((err, createdGroup) => {
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
    const newInfo = req.body.group;
    // console.log(newInfo);
    Groups.updateOne({ _id: req.params.id }, { $set: newInfo }, () => {});
    const info = await Groups.findById(req.params.id);

    res.status(201).json({
      info,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteGroup = async (req, res) => {
  let groupID = req.params.id;
  await Event.findByIdAndDelete(groupID);
  res.json({ status: 200, msg: "group deleted" });
};
