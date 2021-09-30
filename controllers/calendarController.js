const Event = require("./../models/event");

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
  let userID = req.user._id;
  let { title, description, date, time, people, eventType, location } =
    req.body;
  if (people) {
    people = people.split(",");
  }
  const newEvent = new Event({
    title,
    description,
    date,
    time,
    people,
    eventType,
    location,
    userID,
  });
  const saveEvent = await newEvent.save();
  res.json({ status: 200, data: saveEvent });
};

//update event details
exports.updateEvent = async (req, res) => {
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
    eventID,
  } = req.body;
  if (people) {
    people = people.split(",");
  }
  let updateEvent = await Event.findByIdAndUpdate(
    eventID,
    {
      title,
      description,
      date,
      time,
      people,
      eventType,
      location,
      meetingNotes,
      userID,
    },
    { overwrite: true, new: true }
  );
  res.json({ status: 200, data: updateEvent });
};

//delete event
exports.deleteEvent = async (req, res) => {
  let eventID = req.params.id;
  await Event.findByIdAndDelete(eventID);
  res.json({ status: 200, msg: "event deleted" });
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
