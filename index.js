const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("./models/db");
// const templateRouter = require("./routes/templateRouter");
const authRouter = require("./routes/authRoute");
const mainRouter = require("./routes/mainRoute");

let port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json({ urlencoded: true }));
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(cookieParser());
// app.use("/api", templateRouter);
app.use("/api/auth", authRouter);
app.use("/api/main", mainRouter);

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`The server is runnning at port ${port}`);
});
