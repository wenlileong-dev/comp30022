const express = require("express");
const path = require("path");
const cors = require("cors");

require("./models/db");
const templateRouter = require("./routes/templateRouter");

let port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json({ urlencoded: true }));
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use("/api", templateRouter);

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

//bug fix testing

app.listen(port, () => {
  console.log(`The server is runnning at port ${port}`);
});
