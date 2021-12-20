require("./mongodb/mogoose");
require("dotenv").config();
const accountRoute=require('./route/account/account')
const cors = require("cors");
const express = require("express");
const app = new express();
const path = require("path");
app.use("/public", express.static("public"));
app.use(cors());
const port = process.env.PORT;
app.use(express.json());
//setting up server
app.get("/", function (req: any, res: any) {
  res.send("Express is working on IISNode!");
  // console.log(port);
});

app.use('/account', accountRoute);

const server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

export default server;