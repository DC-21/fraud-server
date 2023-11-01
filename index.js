const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./src/db/db");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Api is running");
});
app.use("/", require("./src/routes/user-route"));
app.use("/", require("./src/routes/transaction-routes"));
app.use("/", require("./src/routes/report-routes"));
app.use("/", require("./src/routes/admin-routes"));

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log("server is running on port 9k");
});
