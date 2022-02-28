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
require("./routes/category_routes")(app);
require("./routes/genre_routes")(app);
require("./routes/user_views_routes")(app);
require("./routes/user_wish_list_routes")(app);
require("./routes/subtitle_routes")(app);
require("./routes/audio_routes")(app);
require("./routes/cast_routes")(app);
require("./routes/series_number.routes")(app);
require("./routes/package_routes")(app);

// var ffmpegbinaries = require("ffmpeg-binaries");
// var ffmpeg = require("fluent-ffmpeg");
// ffmpeg.setFfmpegPath("/user/bin/ffmpeg");
// ffmpeg.setFfprobePath("/user/bin/ffprobe");

// var ffmpegpath = ffmpegbinaries.ffmpegpath();
// var ffprobepath = ffmpegbinaries.ffprobepath();

// ffmpeg.setffmpegpath(ffmpegpath);

// ffmpeg("1641905461289_part3.wmv")
//   .on("end", function () {
//     console.log("Screenshots taken");
//   })

//   .on("error", function (err: any) {
//     console.error("this error:");

//     console.error(err);
//   })
//   .screenshots({
//     // Will take screenshots at 20%, 40%, 60% and 80% of the video

//     count: 4,

//     folder: "public/uploads",
//   });

app.get("/file", function (req: any, res: any) {
  res.sendFile(__dirname + "/public/index.html");
});

app.use((err: any, req: any, res: any, next: any) => {
  res.status(422).send({ isSuccess: false, err_msg: err.message });
});

const server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

module.exports = server;
