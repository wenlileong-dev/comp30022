const {Groups, Contacts} = require("./../models/db.js");

// get all group
exports.displayGroup = async (req, res, next) => {
	try {
		const allGroups = await Groups.find({});
		res.status(200).json({
			allGroups
		})
	} catch (err) {
		next(err);
	}
	
}

// create a new group
exports.newGroup = async (req, res) => {
  try {
    const group = new Groups({
      groupName: req.body.groupName,
      contactNumber: req.body.contactNumber,
      contacts: req.body.contacts,
      isTop: req.body.isTop
    })
    group.save((err, createdGroup) => {   
        if(err){
            res.status(400).json({ success: false, err: err});
        }else{
            res.status(200).json({ success: true, order: createdGroup});
        }
    })
  }
  catch {
    res.status(400)
    return res.send("Database update failed")
  }
}

exports.updateInformation = async (req, res, next) => {
	try {
		const newInfo = req.body.group;
		// console.log(newInfo);
		Groups.updateOne({'_id': req.params.id}, 
			{$set: newInfo}, () => {});
		const info = await Groups.findById(req.params.id);

		res.status(201).json({
			info
		})
	} catch (err) {
		next(err); 
	}
}

// exports.deleteGroup = async (req, res) => {
//     let groupID = req.body.id;
//     const oldGroup = Groups.findById(groupID);
//     await Groups.findByIdAndDelete(groupID);
//     res.json({ status:200, msg: "group deleted"});
// }

exports.deleteGroup = async (req, res) => {
  let groupID = req.body.id;
  let defaultGroup = await Groups.findById("614feba57ed1181a1837746d");
  let oldGroup =  await Groups.findById(groupID);
  const moveContact = defaultGroup.contacts.concat(oldGroup.contacts);
  defaultGroup.contacts = moveContact;
  res.json({ status:200, msg: moveContact});

  try {
    Groups.updateOne({'_id': '614feba57ed1181a1837746d'}, 
    {$set: defaultGroup}, () => {})
  }catch (e){
    res.json({ errorMsg: "database error"});
  }
  
  await Groups.findByIdAndDelete(groupID);
  res.json({ status:200, msg: "group deleted"});
}


exports.getAllGroup = async(req, res) => {
  try{
    let allGroups = await Groups.find();
    let allContacts = [];
    for (let i=0;i < allGroups.length; i++) {
      let groupContactId = allGroups[i].contacts;
      let groupContacts = [];
      for (let j = 0; j < groupContactId.length; j++) {
        let contact = await Contacts.findById(groupContactId[j]);
        groupContacts.push(contact);
      }
      allContacts.push(groupContacts);
    }
    res.json({ allGroups, allContacts});
  } catch (error) {
    res.json({ errorMsg: "database error"});
  }
};

exports.topGroup = async(req, res) => {
  let groupID = req.body.id;
  let group = await Groups.findById(groupID);
  group.isTop = !group.isTop;
  res.json({ group });

  try{
    
    Groups.updateOne({'_id': req.body.id},
    {$set: group}, () => {})
  }catch (e){
    res.json({ errorMsg: "database error"});
  }
  
}