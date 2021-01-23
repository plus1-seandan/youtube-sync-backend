const express = require("express");
const router = express.Router();

const { google } = require("googleapis");
const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY,
});

router.get("/", async (req, res) => {
  try {
    const query = req.query.query;

    const response = await youtube.search.list({
      part: "snippet",
      type: "video",
      q: query,
      maxResults: 4,
      order: "date",
      safeSearch: "moderate",
      videoEmbeddable: true,
    });
    res.send(response.data.items);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
