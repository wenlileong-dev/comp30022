// skeleton code
const express = require("express");
const path = require("path");
const cors = require("cors");

//connect with database
require("./models/db");

//require router

const userRouter = require("./routes/userRouter");
const calendarRouter = require("./routes/calendarRouter");
const group = require("./routes/groupRouter");

let port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json({ urlencoded: true }));
app.use(express.static(path.resolve(__dirname, "./client/build")));

//routing

app.use("/user", userRouter);
app.use("/api/calendar", calendarRouter);
app.use("/group", group);

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`The server is runnning at port ${port}`);
});
