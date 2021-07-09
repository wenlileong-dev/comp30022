const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

connectionString =
  "mongodb+srv://<username>:<password>@personalproject.3gem7.mongodb.net/timeManagement?retryWrites=true&w=majority";
dbAddress = connectionString
  .replace("<username>", process.env.MONGO_USERNAME)
  .replace("<password>", process.env.MONGO_PASSWORD);

mongoose.connect(dbAddress, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(err);
  process.exit(1);
});

db.once("open", async () => {
  console.log("Mongo connection started on " + db.host + ":" + db.port);
});
