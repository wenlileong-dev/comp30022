// skeleton code
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
var cron = require("node-cron");
//connect with database
require("./models/db");

//require router

const userRouter = require("./routes/userRouter");
const calendarRouter = require("./routes/calendarRouter");
const contactRouter = require("./routes/contactRouter");
const group = require("./routes/groupRouter");

const { sendEventReminders } = require("./controllers/calendarController");

let port = process.env.PORT || 5000;
const app = express();
app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));
app.use(cookieParser());
app.use(express.json({ urlencoded: true }));
app.use(express.static(path.resolve(__dirname, "./client/build")));

//routing

app.use("/api/user", userRouter);
app.use("/api/calendar", calendarRouter);
app.use("/api/contacts", contactRouter);
app.use("/api/group", group);

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

cron.schedule("* * * * *", () => {
  sendEventReminders();
});

app.listen(port, () => {
  console.log(`The server is runnning at port ${port}`);
});

module.exports = app;
