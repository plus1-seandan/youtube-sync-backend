const express = require("express");
const router = express.Router();

var { google } = require("googleapis");
var youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

// const youtube = app.create({
//   baseURL: "https://www.googleapis.com/youtube/v3/",
//   params: {
//     part: "snippet",
//     maxResults: 2,
//     key: process.env.YOUTUBE_API_KEY,
//   },
// });

router.get("/search-videos", async (req, res) => {
  try {
    var request = youtube.search.list(
      {
        part: "snippet",
        type: "video",
        q: req.query.query,
        maxResults: 6,
        order: "date",
        safeSearch: "moderate",
        videoEmbeddable: true,
      },
      (err, response) => {
        console.log(response.data.items);
        res.send(response.data.items);
      }
    );
    // console.log(response);

    // const response = await youtube.get("/search", {
    //   params: {
    //     q: input,
    //   },
    // });
    // const myRooms = await Room.findAll({
    //   include: [
    //     {
    //       model: AccountRoom,
    //       where: {
    //         AccountId: userId,
    //       },
    //       required: true,
    //       raw: true,
    //     },
    //   ],
    //   raw: true,
    // });
    // res.json(myRooms);
  } catch (err) {
    console.log(err.message);
  }
});
module.exports = router;
