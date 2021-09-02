const Event = require("./../models/event");
exports.addEvent = async (req, res) => {
  const { title, description, date, time, people, eventType, location } =
    req.body;
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
  res.json({ status: 200, data: saveEvent });
};

const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

exports.getEvents = async (req, res) => {
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
    await result.push(dayEvent);
  }

  res.json({ status: 200, data: result });
};
