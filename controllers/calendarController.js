const Event = require("./../models/event");

//create a new event
exports.addEvent = async (req, res) => {
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
  });
  const saveEvent = await newEvent.save();
  res.json({ status: 200, data: newEvent });
};

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

//read the events for a particular month
exports.getEvents = async (req, res) => {
  let userId = req.user;
  let month = parseInt(req.params.month);
  let year = parseInt(req.params.year);
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  let monthEvents = await Event.find({
    date: { $gte: firstDay, $lte: lastDay },
  });
  let daysInMonth = getDaysInMonth(new Date(year, month));
  let result = [];
  for (let i = 1; i <= daysInMonth; i++) {
    let dayEvent = [];
    for (let j = 0; j < monthEvents.length; j++) {
      if (monthEvents[j].date.getDate() === i) {
        await dayEvent.push(monthEvents[j]);
      }
    }
    if (dayEvent.length > 1) {
      dayEvent.sort(compare);
    }
    await result.push(dayEvent);
  }

  res.json({ status: 200, data: result });
};

exports.updateEvent = async (req, res) => {
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
    },
    { overwrite: true, new: true }
  );
  res.json({ status: 200, data: updateEvent });
};

exports.deleteEvent = async (req, res) => {
  let eventID = req.params.id;
  await Event.findByIdAndDelete(eventID);
  res.json({ status: 200, msg: "event deleted" });
};
