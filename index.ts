require("./startup/mogoose");
require("dotenv").config();
const cors = require("cors");
require("util").inspect.defaultOptions.depth = null;
var ffmpeg = require("fluent-ffmpeg");

ffmpeg.setFfmpegPath("./bin/ffmpeg");

ffmpeg.setFfprobePath("./bin/ffprobe");

ffmpeg("1641905461289_part3.wmv")
  .on("end", function () {
    console.log("Screenshots taken");
  })

  .on("error", function (err: any) {
    console.error("this error:");

    console.error(err);
  })
  .screenshots({
    // Will take screenshots at 20%, 40%, 60% and 80% of the video

    count: 4,

    folder: "public/uploads",
  });
const express = require("express");
const app = express();
const port = process.env.PORT;
app.use("/public", express.static("public"));
app.use(cors());
app.use(express.json());

require("./routes/user_routes")(app);
require("./routes/gender_routes")(app);
require("./routes/video_route")(app);
require("./routes/classification_routes")(app);
require("./routes/category_routes")(app);
require("./routes/type_routes")(app);

app.get("/file", function (req: any, res: any) {
  res.sendFile(__dirname + "/public/index.html");
});

app.use((err: any, req: any, res: any, next: any) => {
  res.status(422).send({ error_message: err.message });
});

const server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

module.exports = server;
