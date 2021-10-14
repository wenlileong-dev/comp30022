const Event = require("./../models/event");
const { Contacts } = require("../models/db.js");

//helper function - get number of days of a month
const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

//helper function - sort list of objects by timeInNumbers
function compare(a, b) {
  if (a.timeInNumbers < b.timeInNumbers) {
    return -1;
  }
  if (a.timeInNumbers > b.timeInNumbers) {
    return 1;
  }
  return 0;
}

//create a new event
exports.addEvent = async (req, res) => {
  try {
    let userID = req.user._id;
    let {
      title,
      description,
      date,
      time,
      people,
      eventType,
      location,
      meetingLink,
    } = req.body;
    let modifyPeople = [];
    for (let i = 0; i < people.length; i++) {
      let [firstName, lastName] = people[i].split(" ");
      let findContact = await Contacts.find({
        firstName: firstName,
        lastName: lastName,
      });
      if (findContact.length > 0) {
        modifyPeople.push(findContact[0]);
      } else {
        modifyPeople.push({ firstName, lastName });
      }
    }
    const newEvent = new Event({
      title,
      description,
      date,
      time,
      people: modifyPeople,
      eventType,
      location,
      userID,
      meetingLink,
    });
    const saveEvent = await newEvent.save();
    res.json({ status: 200, data: saveEvent });
  } catch (error) {
    res.json({ status: 400, errorMsg: "Bad Request - invalid input" });
  }
};

//update event details
exports.updateEvent = async (req, res) => {
  try {
    let userID = req.user._id;
    let {
      title,
      description,
      date,
      time,
      people,
      eventType,
      location,
      meetingNotes,
      meetingLink,
      eventID,
    } = req.body;
    let modifyPeople = [];
    for (let i = 0; i < people.length; i++) {
      let [firstName, lastName] = people[i].split(" ");
      let findContact = await Contacts.find({
        firstName: firstName,
        lastName: lastName,
      });
      if (findContact.length > 0) {
        modifyPeople.push(findContact[0]);
      } else {
        modifyPeople.push({ firstName, lastName });
      }
    }
    let updateEvent = await Event.findByIdAndUpdate(
      eventID,
      {
        title,
        description,
        date,
        time,
        people: modifyPeople,
        eventType,
        location,
        meetingNotes,
        meetingLink,
        userID,
      },
      { overwrite: true, new: true, runValidators: true }
    );
    res.json({ status: 200, data: updateEvent });
  } catch (error) {
    res.json({ status: 400, errorMsg: "Bad Request - invalid input" });
  }
};

//delete event
exports.deleteEvent = async (req, res) => {
  try {
    let eventID = req.params.id;
    let deletedEvent = await Event.findByIdAndDelete(eventID);
    res.json({ status: 200, data: deletedEvent });
  } catch (error) {
    res.json({ status: 400, errorMsg: "Bad Request - Invalid eventID" });
  }
};

//read the events for a particular month
exports.getEvents = async (req, res) => {
  let userID = req.user._id;
  let month = parseInt(req.params.month);
  let year = parseInt(req.params.year);
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 1);

  //get the events that occur in the given month
  let monthEvents = await Event.find({
    date: { $gte: firstDay, $lt: lastDay },
    userID: userID,
  });
  let daysInMonth = getDaysInMonth(new Date(year, month));

  let result = [...Array(daysInMonth)].map((e) => []);

  //add the event to the day respectively
  for (let i = 0; i < monthEvents.length; i++) {
    let eventDay = monthEvents[i].date.getDate();
    result[eventDay - 1].push(monthEvents[i]);
  }

  //sort the event by time for each day
  for (let j = 0; j < result.length; j++) {
    if (result[j].length > 1) {
      result[j].sort(compare);
    }
  }
  res.json({ status: 200, data: result });
};

exports.getTwoMonthEvents = async (req, res) => {
  let userID = req.user._id;
  let month = parseInt(req.params.month);
  let year = parseInt(req.params.year);
  const firstDay = new Date(year, month, 1);
  let lastDay=0;
  if(month==12){
    lastDay = new Date(year+1, 2, 1);
  }else{
    lastDay = new Date(year, month + 2, 1);
  }

  //get the events that occur in the given month
  let monthEvents = await Event.find({
    date: { $gte: firstDay, $lt: lastDay },
    userID: userID,
  });
  let daysInMonth = getDaysInMonth(new Date(year, month));
  console.log(daysInMonth)
  let daysInNextMonth = 0;
  if(month==12){
    daysInNextMonth = getDaysInMonth(new Date(year+1,0))
  }else{
    daysInNextMonth = getDaysInMonth(new Date(year,month+1))
  }
  // let daysInNextMonth = getDaysInMonth(new Date(year, month+1))
  console.log(daysInNextMonth)

  let result = [...Array(daysInMonth+daysInNextMonth)].map((e) => []);

  //add the event to the day respectively
  for (let i = 0; i < monthEvents.length; i++) {
    if(monthEvents[i].date.getMonth()===month){
      let eventDay = monthEvents[i].date.getDate();
      result[eventDay - 1].push(monthEvents[i]);
    }else{
      let eventDay = monthEvents[i].date.getDate()+daysInMonth;
      result[eventDay - 1].push(monthEvents[i]);
    }
  }

  //sort the event by time for each day
  for (let j = 0; j < result.length; j++) {
    if (result[j].length > 1) {
      result[j].sort(compare);
    }
  }
  res.json({ status: 200, data: result });
};