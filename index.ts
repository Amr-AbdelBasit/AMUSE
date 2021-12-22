require("./startup/mogoose");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = new express();
app.use("/public", express.static("public"));
app.use(cors());
const port = process.env.PORT;
app.use(express.json());
require('./startup/routes')(app)
const server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

export default server;