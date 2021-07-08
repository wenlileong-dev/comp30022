const express = require("express");
const path = require("path");
const cors = require("cors");

let port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("/api", (req, res) => {
  res.json({ status: 200, data: "Welcome to API" });
});

app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`The server is runnning at port ${port}`);
});
